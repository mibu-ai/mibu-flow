import HomeElement from '../components/HomeElement';
import FlowBar from '../components/FlowBar';
import Automate from '../components/Automate';

const TestComponent = () => {
    return (
        <div className='w-screen h-screen flex'>
            <HomeElement />
            <FlowBar />
            <Automate/>
        </div>
    );
};

export default TestComponent;