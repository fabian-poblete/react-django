import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateTask(params.id, data);
      toast.success("Tarea actualizada", {
        position: "bottom-center",
        style: {
          background: "blue",
          color: "white",
        },
      });
    } else {
      await createTask(data);
      toast.success("Tarea creada", {
        position: "bottom-center",
        style: {
          background: "green",
          color: "white",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        console.log("obteniendo datos");
        // const res = await getTask(params.id);
        // const {
        //   data: { title, description },
        // } = await getTask(params.id);

        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
      }
    }
    loadTask();
  }, []);
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>Title is required</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>Description is required</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>

        {params.id && (
          <div className="flex justify-end">
            <button
              className="bg-red-500 p-3 rounded-lg w-48 mt-3"
              type="button"
              onClick={async () => {
                const accepted = window.confirm("are you sure?");
                if (accepted) {
                  await deleteTask(params.id);
                  toast.success("Tarea eliminada", {
                    position: "bottom-center",
                    style: {
                      background: "red",
                      color: "white",
                    },
                  });
                  navigate("/tasks/");
                }
              }}
            >
              Delete
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
