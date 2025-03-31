import Link from "next/link";
const Home = () => {
  return (
    <div className="m-5">
      <h1 className="text-3xl font-light">
        A blank website for AI chatbot demos.
      </h1>
      <div className = 'mt-1'>
        <span className = 'text-zinc-500'>Powered by </span>
        <a href="https://www.centonis.com/" target="_blank">
          Centonis AI
        </a>
      </div>
    </div>
  );
};

export default Home;
