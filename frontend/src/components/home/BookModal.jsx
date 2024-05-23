import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ item, onClose }) => {
  return(
    <div
      onClick={onClose}
      className="fixed bg-black bg-opacitiy-70 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] h-[400px] bg-white p-4 rounded-xl flex flex-col relative max-w-full"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {item.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{item._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-2xl text-red-300" />
          <h2 className="my-1">{item.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-2xl text-red-300" />
          <h2 className="my-1">{item.author}</h2>
        </div>
        <p className="mt-4">Anything You want to show</p>
        <p className="my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatibus, quidem, doloremque, quas voluptas quibusdam dolorum
          maiores quae quos quia ipsam. Quisquam voluptatibus, quidem, doloremque,
          quas voluptas quibusdam dolorum maiores quae quos quia ipsam.
        </p>
      </div>
    </div>
  )
}

export default BookModal;