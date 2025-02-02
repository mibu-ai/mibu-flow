const RestoreBtn = ({ onClick }) => {
    return (
        <div 
            onClick={onClick} 
            className="hover:cursor-pointer text-white bg-custom-blue active:opacity-[80%] w-36 h-10 rounded-2xl font-semibold border-2 border-custom-border flex items-center justify-center shadow-lg select-none"
        >
            <h2>Restore ^_^</h2>
        </div>
    );
};

export default RestoreBtn;
