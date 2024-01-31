import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState<any>([]);
  const [currentData, setCurrentData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const imgRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bestinbd.com/projects/web/task/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=yes&gallery=yes"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.featured_project);
        setCurrentData(result.featured_project[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    imgRefs.current = imgRefs.current.slice(0, data.length);
  }, [data]);

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % data.length;
    setCurrentSlide(newIndex);
    setCurrentData(data[newIndex]);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide === 0 ? data.length - 1 : currentSlide - 1;
    setCurrentSlide(prevIndex);
    setCurrentData(data[prevIndex]);
  };

  const slideProps = useSpring({
    transform: `translateX(-${imgRefs.current
      .slice(0, currentSlide)
      .reduce((acc, ref) => acc + (ref?.clientWidth || 0) + 30, 0)}px)`,
  });

  if (loading) return <h1 className="text-center">Loading...</h1>;
  if (!data || data.length === 0) return <h1 className="text-center">No data found</h1 >;

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-row gap-20 bg-white h-[400px] p-[80px]">
          <div className="w-[30%]">
            <h1 className="uppercase text-xl sm:text-3xl font-bold text-gray-900">
              Indulge in <br /> Decadence
            </h1>
            <p className="text-gray-500 font-medium mt-3">
              {currentData.data.product_data.title}
            </p>
            <p>{currentData.data.product_data.location}</p>
          </div>
        </div>
        <div className="bg-indigo-950 flex flex-col min-h-[550px] p-[80px] pt-[150px]">
          <div className="flex w-[40%] gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-[2px] pb-[4px] px-[8px] border rounded-full text-white hover:bg-white hover:text-black outline-none focus:outline-none transition duration-300 ease text-2xl"
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === data.length - 1}
              className="p-[2px] pb-[4px] px-[8px] border rounded-full text-white hover:bg-white hover:text-black outline-none focus:outline-none transition duration-300 ease text-2xl"
            >
              &#x2192;
            </button>
           
          </div>
          <div className="flex items-center justify-center flex-col pt-[150px]">
            <h1 className="uppercase text-white text-xl tracking-[2px]">
              Overview
            </h1>
            <p className="text-white text-center mt-2 w-[70%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, a vitae natus, quisquam facere harum fugit ad soluta
              iure tempore corrupti libero temporibus maxime quas enim optio
              eaque vero. Fugiat ex molestias autem libero, maxime tempora
              doloremque commodi iure, dicta harum illo praesentium nostrum
              aliquid. Ut eveniet pariatur eligendi beatae doloremque voluptas
              accusamus nulla inventore placeat optio. Ea inventore non tempora
              expedita ipsa, iusto fuga minus quisquam provident, eaque,
              adipisci neque deleniti aspernatur corrupti ab dolore natus nulla
              ut sed. Optio inventore aut dolorum libero beatae ex assumenda,
              
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden absolute top-[10%] left-[40%] flex flex-row z-100 h-[500px] p-[80px]">
        <animated.div className="flex gap-[30px] w-full" style={slideProps}>
          {data &&
            data.map((d: any, index: any) => (
              <img
                key={index}
                ref={(ref) => (imgRefs.current[index] = ref)}
                src={d.data.images.list[0].full_path}
                alt={`slide ${index + 1}`}
                className={`w-[250px] h-[300px] slide-image ${
                  index === currentSlide ? "active" : ""
                }`}
              />
            ))}
        </animated.div>
      </div>
    </div>
  );
};

export default App;
