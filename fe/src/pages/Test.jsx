import HomeElement from '../components/HomeElement';
import FlowBar from '../components/FlowBar';
import Automate from '../components/Automate';
import DndFile from '../components/DndFile';
const TestComponent = () => {
    return (
        <div className='w-screen h-screen flex'>
            <HomeElement />
            <FlowBar />
            <Automate/>
            <DndFile></DndFile>
        </div>
    );
};

export default TestComponent;