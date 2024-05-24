const HomeNavList = [
    { title:"Home", path:"/" },
    { title:"Data Owner", path:"/dataowner" },
    { title:"Recipient", path:"/recipient" },
    { title:"Authority Center", path:"/authority" },
    { title:"Cloud Server", path:"/cloud" },
]

const AuthorityNavList = [
    { title:"Owners", path:"/dashboard/authority/allowners" },
    { title:"Recipients", path:"/dashboard/authority/allrecipients" },
    { title:"Owner Activation", path:"/dashboard/authority/activeowner" },
    { title:"Recipient Activation", path:"/dashboard/authority/activerecipient" },
    { title:"Share Request", path:"/dashboard/authority/request" },
    // { title:"Re Share Request", path:"/dashboard/authority/resharerequest" },
    { title:"Key Request", path:"/dashboard/authority/keyrequest" },
]


const RecipientNavList = [
    { title:"Owner Shared Files", path:"/dashboard/recipient/osharedfiles" },
    { title:"Recipient Shared Files", path:"/dashboard/recipient/rsharedfiles" },
    { title:"Share Files", path:"/dashboard/recipient/reshare" },
    { title:"File Transaction", path:"/dashboard/recipient/filetrans" },
    { title:"File View", path:"/dashboard/recipient/fileview" },
]

const OwnerNavList = [
    { title:"File Upload", path:"/dashboard/dataowner/fileupload" },
    { title:"My Files", path:"/dashboard/dataowner/myfiles" },
    { title:"Share Files", path:"/dashboard/dataowner/sharefiles" },
    { title:"Files Transaction", path:"/dashboard/dataowner/filestransaction" },
]
const CloudNavList = [
    { title:"Uploaded Files", path:"/dashboard/cloud/allfiles" },
    { title:"Graph", path:"/dashboard/cloud/graph" },
    { title:"Re Shared Data", path:"/dashboard/cloud/reshares" },
    
]

export {
    HomeNavList,
    AuthorityNavList,
    OwnerNavList,
    RecipientNavList,
    CloudNavList,
}