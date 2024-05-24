import React from 'react';
import Modal from "react-modal";
import { Dashboard, HomeScreen, PageNotFoundScreen } from './screens';
import HomeLayout from './layouts/HomeLayout';
import { Route, Routes } from 'react-router-dom';
import { AuthorityScreen } from './screens';
import DataOwnerScreen from './screens/DataOwner/DataOwnerScreen';
import CloudScreen from './screens/Cloud Server/CloudScreen';
import RecipientScreen from './screens/Recipient/RecipientScreen';
import AuthorityLayout from './layouts/AuthorityLayout';
import AHomeScreen from './screens/Authority/AHomeScreen';
import AOwnersList from './screens/Authority/AOwnersList';
import ARecipientsList from './screens/Authority/ARecipientsList';
import OActivation from './screens/Authority/OActivation';
import RActivation from './screens/Authority/RActivation';

import CloudLayout from './layouts/CloudLayout';
import CHomeScreen from './screens/Cloud Server/CHomeScreen';
import CGraph from './screens/Cloud Server/CGraph';
import CPieChart from './screens/Cloud Server/CPieChart';
import CUploadedFiles from './screens/Cloud Server/CUploadedFiles';
import DataOwnerLayout from './layouts/OwnerLayout';
import DOHomeScreen from './screens/DataOwner/DOHomeScreen';
import DOFileUpload from './screens/DataOwner/DOFileUpload';
import DOShareFiles from './screens/DataOwner/DOShareFiles';
import DOFileTransactions from './screens/DataOwner/DOFileTransactions';
import DOMyFiles from './screens/DataOwner/DOMyFiles';
import { Toaster } from 'react-hot-toast';
import AShareRequest from './screens/Authority/AShareRequest';
import AKeyRequest from './screens/Authority/AKeyRequest';
import RecipientLayout from './layouts/RecipientLayout';
import RHomeScreen from './screens/Recipient/RHomeScreen';
import OSharedFiles from './screens/Recipient/OSharedFiles';
import FileView from './screens/Recipient/FileView';
import RShareFiles from './screens/Recipient/RShareFiles';
import RSharedFiles from './screens/Recipient/RSharedFiles';
import ReshareData from './screens/Cloud Server/ReshareData';
import RFileTransactions from './screens/Recipient/RFileTransactions';
Modal.setAppElement('#root');



const App = () => {


  return (
    <div>
      <Toaster />
       <Routes>
       <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/dataowner" element={<DataOwnerScreen />} />
          <Route path="/recipient" element={<RecipientScreen />} />
          <Route path="/authority" element={<AuthorityScreen />} />
          <Route path="/cloud" element={<CloudScreen />} />
          <Route path="*" element={<PageNotFoundScreen />} />
        </Route>

        <Route path='/dashboard/' >
            <Route index element={<Dashboard/>} />
          <Route path="/dashboard/authority/" element={<AuthorityLayout />} >
            <Route index element={<AHomeScreen />} />
            <Route path='/dashboard/authority/allrecipients' element={<ARecipientsList />} />
            <Route path='/dashboard/authority/allowners' element={<AOwnersList />} />
            <Route path='/dashboard/authority/activeowner' element={<OActivation />} />
            <Route path='/dashboard/authority/activerecipient' element={<RActivation />} />
            <Route path='/dashboard/authority/request' element={<AShareRequest/>} />
            <Route path='/dashboard/authority/keyrequest' element={<AKeyRequest/>} />
          </Route>

          <Route path="/dashboard/cloud/" element={<CloudLayout />} >
            <Route index element={<CHomeScreen />} />
            <Route path='/dashboard/cloud/graph' element={<CGraph />} />
            <Route path='/dashboard/cloud/reshares' element={<ReshareData/>} />
            <Route path='/dashboard/cloud/allfiles' element={<CUploadedFiles />} />
          </Route>

          <Route path="/dashboard/dataowner/" element={<DataOwnerLayout />} >
            <Route index element={<DOHomeScreen />} />
            <Route path='/dashboard/dataowner/fileupload' element={<DOFileUpload/>} />
            <Route path='/dashboard/dataowner/myfiles' element={<DOMyFiles />} />
            <Route path='/dashboard/dataowner/sharefiles' element={<DOShareFiles />} />
            <Route path='/dashboard/dataowner/filestransaction' element={<DOFileTransactions />} />
          </Route>

          <Route path="/dashboard/recipient/" element={<RecipientLayout />} >
            <Route index element={<RHomeScreen />} />
            <Route path='/dashboard/recipient/osharedfiles' element={<OSharedFiles/>} />
            <Route path='/dashboard/recipient/rsharedfiles' element={<RSharedFiles/>} />
            <Route path='/dashboard/recipient/reshare' element={<RShareFiles/>} />
            <Route path='/dashboard/recipient/fileview' element={<FileView/>} />
            <Route path='/dashboard/recipient/filetrans' element={<RFileTransactions/>} />
            
          </Route>
          <Route path="*" element={<PageNotFoundScreen />} />
        </Route>
      </Routes>
    </div>




  )
}

export default App