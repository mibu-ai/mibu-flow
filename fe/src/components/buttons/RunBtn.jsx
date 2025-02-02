import PropTypes from 'prop-types';
import { ToastContainer, toast } from "react-toastify";
import { useFileUpload } from "../../FileUploadContext";
import 'react-toastify/dist/ReactToastify.css';

const handleCLick = () => {
    toast.info('Run button clicked!', { autoClose: 1000 });
};

const RunBtn = ({ onClick }) => {
    const { parseFile } = useFileUpload();
    
    return (
        <div 
            className="hover:cursor-pointer text-white bg-custom-blue active:opacity-[80%] font-poppins w-32 h-10 rounded-2xl font-semibold border-2 border-custom-border flex items-center justify-center shadow-lg select-none"
            onClick={(e) => {
                handleCLick();
                onClick(e);
                parseFile();
            }}
        >
            <h2>Run（︶^︶）</h2>
            <ToastContainer/>

        </div>
    );
};

RunBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default RunBtn;
