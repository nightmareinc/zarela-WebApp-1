import React from 'react';

import Dropzone from 'react-dropzone';
import { Box } from 'rebass';
import { BodyText } from './Elements/Typography';

export default function MultisendDropzone({ handleDrop, fileNames }) {
	return (
		<Box>
			<Dropzone onDrop={handleDrop} accept=".csv" multiple={false}>
				{({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
					const additionalClass = isDragAccept ? 'accept' : isDragReject ? 'reject' : '';

					return (
						<Box
							sx={{
								background: '#F9F9F9',
								border: '1px dashed #D7D7D7',
								boxSizing: 'border-box',
								borderRadius: 3,
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: ' 130px',
							}}
							{...getRootProps({
								className: `dropzone ${additionalClass}`,
							})}
						>
							<input {...getInputProps()} />
							<BodyText variant="big">
								{`
								Drag and drop the csv or click to select a file
								or click to select a file
								`}
							</BodyText>
						</Box>
					);
				}}
			</Dropzone>
			{fileNames.length ? (
				<Box display={'flex'} mt={3}>
					<BodyText variant="big">Selected:</BodyText>
					<Box display="flex" flexDirection={'column'} mt={1} ml={2}>
						{fileNames.map((fileName) => (
							<BodyText sx={{ textAlign: 'left' }} variant="hint">
								{fileName}
							</BodyText>
						))}
					</Box>
				</Box>
			) : null}
		</Box>
	);
}
