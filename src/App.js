import AppRouter from './Router';
import ToastifyContainer from './components/ToastifyContainer';
import ThemeProvider from './theme/index';
import { PendingFilesProvider } from './state/pendingFilesProvider';
import { LocalStorageProvider } from './state/localStorageProvider/LocalStoragePriveder';
import { NotificationProvider } from './state';
import { GlobalStyle } from './globalStyle';
import ErrorBoundary from './ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import useInitConnectors from './state/initConnectors';

function App() {
	useInitConnectors();

	return (
		<div className="App">
			<ThemeProvider>
				<ErrorBoundary>
					<ApolloProvider client={client}>
						<PendingFilesProvider>
							<LocalStorageProvider>
								<NotificationProvider>
									<AppRouter />
									<ToastifyContainer enableMultiContainer containerId={'toastify'} limit={3} />
									<GlobalStyle />
								</NotificationProvider>
							</LocalStorageProvider>
						</PendingFilesProvider>
					</ApolloProvider>
				</ErrorBoundary>
			</ThemeProvider>
		</div>
	);
}

export default App;
