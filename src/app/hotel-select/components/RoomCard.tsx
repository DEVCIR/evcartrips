"use client";
import type React from "react";
import Image from "next/image";
import type { Room } from "../types/hotel";
import { UserIcon, RoomIcon, MealIcon, CheckIcon } from "./Icons";


interface RoomCardProps {
  room: Room;
  onSelect: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect }) => {
  const roomDetails = [
    {
      icon: <UserIcon className="w-4 h-4 mr-1" />,
      text: `${room.sleeps} Sleeps`,
    },
    { icon: <RoomIcon className="w-4 h-4 mr-1" />, text: room.bedType },
    { icon: <MealIcon className="w-4 h-4 mr-1" />, text: room.mealPlan },
  ];

  const actionButtons = [
    { icon: <CheckIcon className="w-4 h-4 mr-1" />, text: "More room details" },
    {
      icon: <CheckIcon className="w-4 h-4 mr-1" />,
      text: "Cancellation policy",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Fixed aspect ratio container (16:9) */}
      <div className="relative aspect-video bg-gray-200">
        <Image
          src={room.image || "/placeholder.svg"}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h4 className="text-xl font-bold mb-3">{room.name}</h4>
        <div className="flex md:flex-wrap items-center gap-x-4 text-[9px] md:text-xs text-gray-600 mb-3">
          {roomDetails.map((detail, index) => (
            <div key={index} className="flex items-center">
              {detail.icon}
              {detail.text}
            </div>
          ))}
        </div>
        <div className="flex md:flex-wrap items-center gap-4 mb-4">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              className="text-blue-500 text-xs flex items-center"
            >
              {button.icon}
              {button.text}
            </button>
          ))}
        </div>
        <div className="flex md:flex-wrap items-center justify-between gap-4">
          <span className="text-lg md:text-2xl font-semibold md:font-bold">
            US$ {room.price.toFixed(2)}
          </span>
          <button
            onClick={() => onSelect(room.id)}
            className="cursor-pointer not-[]:btn-gradient text-white text-[10px]  px-6 py-2 rounded-lg font-medium"
          >
            SELECT ROOM
          </button>
        </div>
      </div>
    </div>
  );
};
