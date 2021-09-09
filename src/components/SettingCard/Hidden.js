import React from 'react';
import styled from 'styled-components';
import hide from '../../assets/icons/actionIcons/hide.svg';
import unHide from '../../assets/icons/actionIcons/unHide.svg';

import {
	CompactRequestCard,
	Row,
	Header,
	Body,
	Column,
	BiobitIcon,
	DollarValue,
	CaretIcon,
	StatusIcon,
	StatusLabel,
	BiobitValue,
	VerticalDivider,
	Title,
	QuickReport,
	QuickReportTitle,
	RequestNumber,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	TableBulkRow,
} from '../LogCards/Elements';

const SettingTableCell = styled(TableCellWrapper)`
	flex: ${(props) => props.flex} !important;
`;

const ActionIcon = styled(StatusIcon)`
	width: 25px;
	margin: 0px calc((100% - (3 * 25px)) / 6);
`;

const ActionTitle = styled.span`
	margin: 0 10%;
`;

const Hidden = () => {
	return (
		<CompactRequestCard>
			<Body>
				<Table>
					<TableRow header>
						<SettingTableCell flex="0 0 15%">
							<TableCell>Request No.</TableCell>
						</SettingTableCell>
						<SettingTableCell flex="0 0 15%">
							<TableCell>Name</TableCell>
						</SettingTableCell>
						<SettingTableCell flex="0 0 55%">
							<TableCell>public key</TableCell>
						</SettingTableCell>

						<SettingTableCell flex="0 0 15%">
							<TableCell>Hide/Unhide</TableCell>
						</SettingTableCell>
					</TableRow>
					<TableBulkRow>
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<TableRow key={1}>
								<SettingTableCell flex="0 0 15%">
									<TableCell> 145 </TableCell>
								</SettingTableCell>
								<SettingTableCell flex="0 0 15%">
									<TableCell>Masood-beigi</TableCell>
								</SettingTableCell>
								<SettingTableCell flex="0 0 55%">
									<TableCell>WEERTYUNBGWEERTYUNBGWEERTYUNBG</TableCell>
								</SettingTableCell>
								<SettingTableCell flex="0 0 15%">
									<TableCell>
										<ActionIcon src={hide} />
									</TableCell>
								</SettingTableCell>
							</TableRow>
						))}
					</TableBulkRow>
				</Table>
			</Body>
		</CompactRequestCard>
	);
};

export default Hidden;
