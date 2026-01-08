"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { PlusIcon } from "../myicon/myicon";
import CubicButton from "../components/CubicButton";
import { cubicApi } from "../utils/path.util";
import { useEffect, useState } from "react";
import { getImgSrc } from "../utils/api.util";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import DisplayTrainer from "./components/DisplayTrainer";
import SortableItem from "../components/DND/SortTableItem";

const TrainerPage = () => {
  const router = useRouter();
  const [trainers, setTrainers] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const [dndProduct, setDndProduct] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const onDragEnd = async (e) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      let newDndProduct = [];
      setDndProduct((prev) => {
        const oldIndex = prev.findIndex((item) => item._id === active.id);
        const newIndex = prev.findIndex((item) => item._id === over.id);

        newDndProduct = arrayMove(prev, oldIndex, newIndex);
        return newDndProduct;
      });
      for (let index = 0; index < newDndProduct.length; index++) {
        const element = newDndProduct[index];

        await cubicApi.put(`/trainer/${element._id}`, {
          current_index: index,
        });
      }
    }

    setActiveId(null);
  };
  const onDragStart = (e) => {
    setActiveId(e.active.id);
  };
  const onDragCancel = () => {
    setActiveId(null);
  };

  useEffect(() => {
    const loadTrainers = async () => {
      const { data } = await cubicApi.get("/trainer");

      setTrainers(data.trainers);
    };
    loadTrainers();
  }, []);

  useEffect(() => {
    setDndProduct(trainers);
  }, [trainers]);

  return (
    <div
      className={cn(
        " w-full min-h-screen   bg bg-cubic-black py-10 px-20  space-y-6"
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="text-white text-5xl font-normal font-BebasNeue">
          trainer
        </div>
        <div
          className=" cursor-pointer"
          onClick={() => {
            router.push("/trainer/create");
          }}
        >
          <CubicButton text="ADD TRAINER" icon={<PlusIcon />} />
        </div>
      </div>

      <div className=" overflow-x-hidden  overflow-y-auto scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragCancel={onDragCancel}
        >
          <SortableContext
            items={dndProduct.map((item) => item._id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-3 gap-6 ">
              {dndProduct.map((service, index) => {
                return (
                  <div key={index}>
                    <SortableItem
                      service={service}
                      id={service._id}
                      setTrigger={setTrigger}
                      index={index}
                      key={index}
                      Component={DisplayTrainer}
                    />
                  </div>
                );
              })}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <DisplayTrainer
                id={activeId}
                service={dndProduct.find((item) => item._id === activeId)}
                index={dndProduct.findIndex((item) => item._id === activeId)}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* <div className="grid grid-cols-4 gap-6">
        {trainers.map((trainer, index) => {
          return (
            <div
              key={index}
              className=" w-[310px] h-[470px]  flex flex-col  justify-end px-[21px] pb-[50px] cursor-pointer"
              onClick={() => {
                router.push(`/trainer/${trainer.id}`);
              }}
              //add image to background

              style={{
                backgroundImage: `url(${getImgSrc(trainer.photo[0])})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className=" font-BebasNeue">
                <div className="text-cubic-yellow text-5xl">{trainer.name}</div>
                <div className="text-cubic-yellow text-4xl line-clamp-2">
                  {trainer.position}
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default TrainerPage;
