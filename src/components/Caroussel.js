import React from "react"

export default function Caroussel(){
    const [currentSlide, setCurrentSlide] = React.useState(0)

    const slides = [
        "./images/caroussel/caroussel-1.jpg", 
        "./images/caroussel/caroussel-2.jpg",
        "./images/caroussel/caroussel-3.jpg",
        "./images/caroussel/caroussel-4.jpg",
        "./images/caroussel/caroussel-5.jpg",
        "./images/caroussel/caroussel-6.jpg"
    ]

    const totalImages = slides.length

    const carousselElements = slides.map((slide, index) => (
        <div className="carousel-item" key={index}>
          <img src={slide} />
        </div>        
      ))
    
    function nextSlide(){
        const nextSlideIndex = (currentSlide === totalImages-1) ? 0 : currentSlide + 1
        setCurrentSlide(nextSlideIndex)
    }

    function prevSlide(){
        const prevSlideIndex = (currentSlide === 0) ? totalImages-1 : currentSlide - 1
        setCurrentSlide(prevSlideIndex)
    }

    React.useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0)
        }, 3000)

        return () => clearInterval(slideInterval)
    }, [])

    return (
            <div className="carousel">
                <div 
                className="carousel-inner"
                style={{ transform: `translateX(${-currentSlide * 100}%)`}}
                >   
                    {carousselElements}
                </div>
                <div className="carousel-actions">
                    <button onClick={prevSlide} id="prevBtn"><i className="fa-sharp fa-solid fa-chevron-left"></i></button>
                    <button onClick={nextSlide} id="nextBtn"><i className="fa-sharp fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
    )
}