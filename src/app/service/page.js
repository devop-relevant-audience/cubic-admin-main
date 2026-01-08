"use client";
import { cn } from "@/lib/utils";
import CubicButton from "../components/CubicButton";
import { useRouter } from "next/navigation";
import { PlusIcon, RightArrowIcon } from "../myicon/myicon";
import { useEffect, useState } from "react";
import { cubicApi } from "../utils/path.util";
import { getPathUrl } from "../utils/api.util";
import Image from "next/image";
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
import DisplayService from "./components/DisplayService";
import SortableItem from "../components/DND/SortTableItem";

const ServicePage = () => {
  const router = useRouter();
  const [services, setServices] = useState([]);
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

        await cubicApi.put(`/service/${element._id}`, {
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

  const loadService = async () => {
    const { data } = await cubicApi.get("/service");

    setServices(data.services);
  };

  useEffect(() => {
    loadService();
  }, [trigger]);

  useEffect(() => {
    setDndProduct(services);
  }, [services]);

  return (
    <div
      className={cn(
        " w-full min-h-screen   bg bg-cubic-black pt-10 pb-[52px] px-16  space-y-6"
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="text-white text-5xl font-BebasNeue">service</div>
        <CubicButton
          onClick={() => {
            router.push("/service/create");
          }}
          text="ADD SERVICE"
          icon={<PlusIcon />}
        />
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
                      Component={DisplayService}
                    />
                  </div>
                );
              })}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <DisplayService
                id={activeId}
                service={dndProduct.find((item) => item._id === activeId)}
                index={dndProduct.findIndex((item) => item._id === activeId)}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default ServicePage;
