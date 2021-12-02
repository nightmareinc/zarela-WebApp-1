import React from 'react';
import { FileInputLink, FileInputWrapper, FileInputTitle, FileInputIcon } from '../UploadFileCard/FileInput';
import { Card, HelperText } from '../UploadFileCard/FileCard';
import styled from 'styled-components';
import fileDownloadIcon from '../../assets/icons/file-download.svg';
import loaderImage from '../../assets/loader/rolling.svg';
import { ThemeButton } from '../Elements/Button';

const CustomFileInputWrapper = styled(FileInputWrapper)`
	margin: 0;
	max-width: unset;
	width: 100%;
`;

const Loader = styled.img`
	width: 25px;
	margin: 0 auto;
`;

const DownloadFileCard = ({ isLoading, fileName, buttonLabel, label, helperText, fileLink }) => {
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
				<ThemeButton size="normal" variant="secondary" to={fileLink} target="_blank">
					{buttonLabel}
				</ThemeButton>
				<FileInputTitle variant='big' fontWeight='semiBold'>
					<FileInputIcon src={fileDownloadIcon} />
					{fileName}
				</FileInputTitle>
			</CustomFileInputWrapper>
			<HelperText>{helperText}</HelperText>
		</Card>
	);
};

export default DownloadFileCard;
