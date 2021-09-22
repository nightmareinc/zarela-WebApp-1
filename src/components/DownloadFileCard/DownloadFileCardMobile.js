import React from 'react';
import { FileInputLink, FileInputWrapper, FileInputTitle, FileInputIcon } from '../UploadFileCard/FileInputMobile';
import { Card, HelperText } from '../UploadFileCard/FileCard';
import styled from 'styled-components';
import loaderImage from '../../assets/loader/rolling.svg';
import fileDownloadIcon from '../../assets/icons/file-download.svg';

const CustomFileInputWrapper = styled(FileInputWrapper)`
	margin: 0;
	max-width: unset;
	width: 100%;
	flex-wrap: nowrap;
	padding: 9px 10px;
	margin-bottom: ${(props) => props.theme.spacing(5)};
`;

const Loader = styled.img`
	width: 25px;
	margin: 0 auto;
`;

const DownloadFileCardMobile = ({ isLoading, fileName, buttonLabel, label, helperText, fileLink }) => {
	if (isLoading)
		return (
			<Card data-tour="request-details-two">
				<CustomFileInputWrapper hasBorder>
					<Loader src={loaderImage} />
				</CustomFileInputWrapper>
				<HelperText>preparing download link ...</HelperText>
			</Card>
		);
	return (
		<Card data-tour="request-details-two">
			<CustomFileInputWrapper hasBorder>
				<FileInputLink href={fileLink} target="_blank">
					{buttonLabel}
				</FileInputLink>
				<FileInputTitle>
					<FileInputIcon src={fileDownloadIcon} />
					{fileName}
				</FileInputTitle>
			</CustomFileInputWrapper>
			<HelperText>{helperText}</HelperText>
		</Card>
	);
};

export default DownloadFileCardMobile;
