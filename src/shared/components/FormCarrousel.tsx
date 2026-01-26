"use client"

import React from "react";

export default function FormCarrousel({
    items,
    currentItemIndex
}: {
    items: React.ReactNode[],
    currentItemIndex: number
}) {
    return (
        <div className="w-full h-fit flex flex-wrap">
            <div
                className="transition-transform duration-300 ease-in-out grid items-center flex-shrink-0"
                style={{
                    width: `${100 * items.length}%`,
                    transform: `translateX(-${(100 / items.length) * currentItemIndex}%)`,
                    gridTemplateColumns: `repeat(${items.length}, 1fr)`
                }}
            >
                {
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="w-full h-fit transition-[max-height,opacity] duration-300 flex flex-col gap-6 justify-center px-10"
                            style={{
                                maxHeight: currentItemIndex === index ? "700px" : "0",
                                opacity: currentItemIndex === index ? 1 : 0
                            }}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}