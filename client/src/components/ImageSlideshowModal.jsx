import React, { useRef, useEffect } from "react"
import { Carousel as NativeCarousel } from "@fancyapps/ui"
import "@fancyapps/ui/dist/carousel/carousel.css"
import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js"
import "@fancyapps/ui/dist/carousel/carousel.thumbs.css"
import { Fancybox as NativeFancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

const ImageSlideshowModal = ({ productImages }) => {
    return (
        <div>
            <Fancybox
                // Sample options
                options={{
                    Carousel: {
                        infinite: false,
                        transition: 'crossfade',
                    }
                }}
            >
                <Carousel
                    // Sample options
                    options={{ infinite: false }}
                >
                    {productImages.map((el, index) => (
                        <div
                            key={index}
                            className="f-carousel__slide cursor-zoom-in"
                            data-fancybox="gallery"
                            data-src={el}
                            data-thumb-src={el}
                        >
                            <img
                                src={el}
                                width="400"
                                height="300"
                            />
                        </div>
                    ))}
                </Carousel>
            </Fancybox>
        </div>
    )
}





function Carousel(props) {
    const defaults = {
        Dots: false,
        Thumbs: {
            type: "classic"
        }
    }
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        const options = {
            ...defaults,
            ...(props.options || {})
        }

        const instance = new NativeCarousel(container, options, { Thumbs })

        return () => {
            instance.destroy()
        }
    })

    return (
        <div className="f-carousel" ref={containerRef}>
            {props.children}
        </div>
    )
}


function Fancybox(props) {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current

        const delegate = props.delegate || "[data-fancybox]"
        const options = props.options || {}

        NativeFancybox.bind(container, delegate, options)

        return () => {
            NativeFancybox.unbind(container)
            NativeFancybox.close()
        }
    })

    return <div ref={containerRef}>{props.children}</div>
}



export default ImageSlideshowModal
