import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function NoDataFound (){
    return (
        <>
        <div style={{textAlign:'center',marginTop:'30px'}}>
        <h4 style={{fontSize:'20px'}}><ContentPasteSearchIcon/> No Records Found!</h4>
        </div>
        </>
    );
}

export default NoDataFound;