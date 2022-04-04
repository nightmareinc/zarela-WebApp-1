import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogCard from '../../components/LogCards/Contribution';
import LogCardMobile from '../../components/LogCards/ContributionMobile';
import { convertToBiobit } from '../../utils';
import NoRequestsFound from '../../components/NoRequestsFound';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../state/store';
import { getConnectorHooks } from '../../utils/getConnectorHooks';

const Card = styled.div`
	width: 100%;
	margin-right: 30px;
	height: ${(props) => (props.isMobile ? '85px' : '180px')};
	margin-bottom: 15px;
	background: #fff;
	padding: 8px 5px;
	display: flex;
	flex-direction: row;
`;
const CircleSection = styled.div`
	margin-right: 28px;
`;
const SquareSection = styled.div`
	flex-grow: 1;
`;

const useStyles = makeStyles({
	root: {
		marginBottom: '12px',
		background: '#F1F6FC',
	},
});

const Contributes = (props) => {
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [paymentDay, setPaymentDay] = useState(null);
	const classes = useStyles(props);
	const { contract, activeConnector, isMobile } = useStore();
	const { useAccount } = getConnectorHooks(activeConnector);
	const account = useAccount();

	useEffect(() => {
		if (contract !== null) {
			if (account) {
				contract
					.orderResult({ from: account })
					.then((result) => {
						const userContributionsSet = new Set([
							...result[1].map((item) => item.toNumber()),
							...result[2].map((item) => item.toNumber()),
						]);
						const userContributions = [...userContributionsSet];
						const getAllRequests = new Promise(async (resolve, reject) => {
							const requests = [];
							const getRequestFiles = (requestContributions) => {
								let angels = requestContributions[0];
								let hubs = requestContributions[1];
								let timestamps = requestContributions[2].map((item) => item.toNumber());
								let rewardGainer = requestContributions[3];
								let status = requestContributions[4];
								let zarelaDay = requestContributions[5].map((item) => item.toNumber());
								let formatted = {};

								angels.forEach((angelAddress, originalIndex) => {
									formatted[originalIndex] = {
										originalIndex,
										timestamp: timestamps[originalIndex],
										zarelaDay: zarelaDay[originalIndex],
										status: status[originalIndex],
										angel: angels[originalIndex],
										hub: hubs[originalIndex],
										rewardGainer: rewardGainer[originalIndex],
									};
								});

								let userContributionIndexes = [];
								Object.keys(formatted).forEach((originalIndex) => {
									const { angel, hub } = formatted[originalIndex];
									if (angel.toLowerCase() === account.toLowerCase() || hub.toLowerCase() === account.toLowerCase()) {
										userContributionIndexes.push(+originalIndex);
									}
								});

								const userContributions = userContributionIndexes.map(
									(originalIndex) => formatted[originalIndex] || null
								);

								return userContributions.filter((item) => item !== null);
							};

							try {
								for (const currentRequest of userContributions) {
									let requestInfo = await contract.orders(currentRequest);
									let contributions = await contract.getOrderData(currentRequest, { from: account });
									// #to-do improve readability
									const requestTemplate = {
										requestID: requestInfo[0].toNumber(),
										title: requestInfo[1],
										description: requestInfo[7],
										requesterAddress: requestInfo[2],
										angelTokenPay: convertToBiobit(requestInfo[3].toNumber(), false),
										laboratoryTokenPay: convertToBiobit(requestInfo[4].toNumber(), false),
										totalContributors: requestInfo[5].toNumber(), // total contributors required
										totalContributed: requestInfo[5].toNumber() - requestInfo[8].toNumber(),
										whitePaper: requestInfo[6],
										timestamp: requestInfo[10].toNumber(),
										totalContributedCount: requestInfo[9].toNumber(),
										// files contributed on this request filtered by current user
										contributions: getRequestFiles(contributions),
									};
									requests.push(requestTemplate);
								}
								resolve(requests);
							} catch (error) {
								console.error(error.message);
								reject(error.message);
							}
						});

						getAllRequests.then((requestsList) => {
							setRequests(requestsList);
							setIsLoading(false);
						});
					})
					.catch((error) => {
						console.error(error.message);
					});
				contract
					.paymentDay()
					.then((response) => {
						setPaymentDay(response.toNumber());
					})
					.catch((err) => {
						console.error(err);
					});
				contract
					.lastRewardableIndex()
					.then((response) => {
						console.log('lastRewardableIndex', response.toNumber());
					})
					.catch((err) => {
						console.error(err);
					});

				contract
					.indexOfAddressPendingReward()
					.then((indexOfAddress) => {
						contract
							.paymentQueue(+indexOfAddress + 1)
							.then((response) => {
								console.log('paymentQueue', response);
							})
							.catch((err) => {
								console.error(err);
							});
						console.log('indexOfAddressPendingReward', indexOfAddress);
					})
					.catch((err) => {
						console.error(err);
					});

				contract
					.dailyRewardPerContributor(15)
					.then((response) => {
						console.log('dailyRewardPerContributor', response.toNumber() / 1000000000);
					})
					.catch((err) => {
						console.error(err);
					});
			}
		}
	}, [account, contract]);

	const message = 'you have not contributed on any requests yet.';
	if (isMobile)
		return isLoading || paymentDay === null ? (
			[1, 2, 3].map((index) => {
				return (
					<Card key={index} isMobile={isMobile}>
						<CircleSection>
							<Skeleton variant="circle" width={41.72} height={41.72} className={classes.root} />
						</CircleSection>
						<SquareSection>
							<Skeleton variant="rect" width={'100%'} height={19} animation="wave" className={classes.root} />
							<Skeleton variant="rect" width={'80%'} height={19.1} className={classes.root} />
						</SquareSection>
					</Card>
				);
			})
		) : requests.length === 0 ? (
			<NoRequestsFound message={message} />
		) : (
			requests.map((request, index) => (
				<LogCardMobile paymentDay={paymentDay} key={index} account={account} data={request} />
			))
		);
	return isLoading || paymentDay === null ? (
		[1, 2, 3].map((index) => {
			return (
				<Card key={index} isMobile={isMobile}>
					<CircleSection>
						<Skeleton variant="circle" width={72} height={72} className={classes.root} />
					</CircleSection>
					<SquareSection>
						<Skeleton variant="rect" width={'100%'} height={33} animation="wave" className={classes.root} />
						<Skeleton variant="rect" width={'33%'} height={'33px'} className={classes.root} />
					</SquareSection>
				</Card>
			);
		})
	) : requests.length === 0 ? (
		<NoRequestsFound message={message} />
	) : (
		requests.map((request, index) => <LogCard key={index} account={account} data={request} paymentDay={paymentDay} />)
	);
};

export default Contributes;
