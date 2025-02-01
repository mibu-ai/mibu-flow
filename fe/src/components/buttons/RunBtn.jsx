import PropTypes from 'prop-types';

const RunBtn = ({ onClick }) => {
    return (
        <div 
            className="hover:cursor-pointer text-white bg-custom-blue active:opacity-[80%] font-poppins w-32 h-10 rounded-2xl font-semibold border-2 border-custom-border flex items-center justify-center shadow-lg select-none"
            onClick={onClick}
        >
            <h2>Run（︶^︶）</h2>
        </div>
    );
};

RunBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default RunBtn;
