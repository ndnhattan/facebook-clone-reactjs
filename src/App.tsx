import { PropsWithChildren, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { ConversationChannelPage } from './pages/conversations/ConversationChannelPage';
import { ConversationPage } from './pages/conversations/ConversationPage';
import { LoginPage } from './pages/LoginPage';
import { AuthContext } from './utils/context/AuthContext';
import { socket, SocketContext } from './utils/context/SocketContext';
import { User } from './utils/types';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { enableMapSet } from 'immer';
import { GroupChannelPage } from './pages/group/GroupChannelPage';
import { GroupPage } from './pages/group/GroupPage';
import { AppPage } from './pages/AppPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConversationPageGuard } from './guards/ConversationPageGuard';
import { GroupPageGuard } from './guards/GroupPageGuard';
import { FriendsLayoutPage } from './pages/friends/FriendsLayoutPage';
import { FriendRequestPage } from './pages/friends/FriendRequestPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { SettingsProfilePage } from './pages/settings/SettingsProfilePage';
import { SettingsAppearancePage } from './pages/settings/SettingsAppearancePage';
import { CallsPage } from './pages/calls/CallsPage';
import { CurrentCallPage } from './pages/calls/CurrentCallPage';
import { PublicRoute } from './components/PublicRoute';
import { setTheme } from './utils/helpers';
import NotFound from './pages/NotFound';
import Home from './pages/facebook/Home';

enableMapSet();

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();
  setTheme();

  return (
    <div className="bg-primary-gray min-h-screen">
      <AppWithProviders user={user} setUser={setUser} socket={socket}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<AuthenticatedRoute children={<AppPage />} />}>
            <Route index element={<Home />}></Route>
            <Route path="messenger">
              <Route path="conversations" element={<ConversationPage />}>
                <Route
                  path=":id"
                  element={
                    <ConversationPageGuard
                      children={<ConversationChannelPage />}
                    />
                  }
                />
                R R
              </Route>
              <Route path="groups" element={<GroupPage />}>
                <Route
                  path=":id"
                  element={<GroupPageGuard children={<GroupChannelPage />} />}
                />
              </Route>
              <Route path="friends" element={<FriendsLayoutPage />}>
                <Route path="requests" element={<FriendRequestPage />} />
                <Route path="blocked" element={<div>Blocked</div>} />
              </Route>
              <Route path="settings" element={<SettingsPage />}>
                <Route path="profile" element={<SettingsProfilePage />} />
                <Route path="appearance" element={<SettingsAppearancePage />} />
              </Route>
              <Route path="calls" element={<CallsPage />}>
                <Route path="current" element={<CurrentCallPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer theme="dark" />
      </AppWithProviders>
    </div>
  );
}

export default App;
