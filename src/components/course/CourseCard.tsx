import React from "react";
import Link from "next/link";
import { FiUser, FiClock, FiBook } from "react-icons/fi";
import { formatNumber } from "@/lib/utils";
import Image from 'next/image';

interface CourseProps {
    course: {
        id: number;
        title: string;
        instructor: string;
        organization: string;
        price: number;
        image?: string;
        rating: number;
        students: number;
        duration?: string;
        chapters?: number;
        level?: string;
    };
}

const CourseCard: React.FC<CourseProps> = ({ course }) => {
    const {
        id,
        title,
        instructor,
        organization,
        price,
        image,
        rating,
        students,
        duration,
        chapters
    } = course;

    // Function to render rating stars
    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:transform hover:scale-105 bg-gray-900 border border-gray-800 h-full">
            <div className="flex-shrink-0 h-48 w-full relative">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        width={500}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        <span className="text-2xl font-bold">{title.substring(0, 2).toUpperCase()}</span>
                    </div>
                )}
                <div className="absolute top-0 right-0 m-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">
                    {price} MyTokens
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                    <Link href={`/courses/${id}`}>
                        <h3 className="text-xl font-semibold text-white hover:text-blue-400">{title}</h3>
                    </Link>

                    <div className="mt-2 flex items-center">
                        <FiUser className="text-gray-400 mr-1" />
                        <p className="text-sm text-gray-300">{instructor}</p>
                    </div>

                    <p className="text-xs text-gray-400">{organization}</p>

                    <div className="mt-3 flex space-x-4">
                        {duration && (
                            <div className="flex items-center text-sm text-gray-400">
                                <FiClock className="mr-1" />
                                <span>{duration}</span>
                            </div>
                        )}

                        {chapters && (
                            <div className="flex items-center text-sm text-gray-400">
                                <FiBook className="mr-1" />
                                <span>{chapters} chapters</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            {renderStars(rating)}
                            <span className="text-sm text-gray-400 ml-1">{rating}</span>
                        </div>
                        <span className="text-sm text-gray-400">{formatNumber(students)} students</span>
                    </div>

                    <div className="mt-4">
                        <Link
                            href={`/courses/${id}`}
                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                        >
                            View Course
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;