const Footer = () => {
    return (
        <footer className="bg-white text-black px-2  h-12 items-center flex fixed left-0 bottom-0 w-screen">
            <p>&copy; {new Date().getFullYear()} Mibu ConuHacks</p>
        </footer>
    );
};
export default Footer;