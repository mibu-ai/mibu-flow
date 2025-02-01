import Automate from '../components/Automate';
import SplitText from "../components/text/SplitText";
import GetStartedBtn from '../components/buttons/GetStartedBtn';

export default function Home() {
    return (
        <div className="h-screen w-screen bg-custom-bg bg-cover bg-center flex flex-col items-center justify-center">
            <div className='absolute top-10 right-10'>
                <Automate />
            </div>
            <div className='absolute font-harabara top-60 left-[330px]'>
                <SplitText
                text="Mibu Flow"
                className="text-[96px] text-custom-blue"
                delay={150}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                />
            </div>
            <GetStartedBtn/>
        </div>
    )
}
