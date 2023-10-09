import React from "react";
import axios from "axios";
import { Modal, Dropdown } from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface IMagazine {
  id?: number;
  title?: string;
  description?: string;
  subscriptionStatus?: string;
  language?: string;
  category?: string;
  type?: string;
}

const App: React.FC = () => {
  const [data, setData] = React.useState<IMagazine[]>([]);
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState<IMagazine>();
  const [subscriptionFilter, setSubscriptionFilter] = React.useState("all");

  const getMagazines = async () => {
    const { data: result } = await axios.get("http://localhost:3000/magazine");

    setData(result);
  };

  React.useEffect(() => {
    getMagazines();
  }, []);

  const onRecordClick = (obj: IMagazine) => {
    setOpen(true);
    setContent(obj);
  };

  const onSubmit = async () => {
    try {
      const { data } =
        content?.type === "edit"
          ? await axios.patch("http://localhost:3000/magazine/" + content.id, { ...content })
          : await axios.post("http://localhost:3000/magazine", { ...content });

      setOpen(false);
      content?.type === "edit"
        ? toast.success(data.title + " updated successfully!")
        : toast.success(data.title + " created successfully!");
      getMagazines();
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const onDeleteSubmit = async (id: number) => {
    try {
      const { data } = await axios.delete("http://localhost:3000/magazine/" + id);

      toast.success(data.title + " deleted successfully!");
      getMagazines();
      setOpen(false);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-3/4">
      <ToastContainer />
      <Modal open={open} setOpen={setOpen}>
        <>
          {content?.type === "edit" || content?.type === "create" ? (
            <div>
              <h1 className="text-2xl mb-4 text-center">
                {content?.type === "edit" ? "Edit Form" : "Create Form"}
              </h1>
              <label className="text-sm text-gray-500 font-light">Title</label>
              <input
                className="border p-2 rounded-md w-full mb-2 outline-none"
                name="title"
                defaultValue={content?.title}
                onChange={(e) => setContent((prev) => ({ ...prev, title: e.target.value }))}
              />

              <label className="text-sm text-gray-500 font-light">Description</label>

              <textarea
                className="border p-2 rounded-md w-full mb-2 outline-none"
                name="description"
                defaultValue={content?.description}
                onChange={(e) => setContent((prev) => ({ ...prev, description: e.target.value }))}
              />

              <label className="text-sm text-gray-500 font-light">Subscription Status</label>

              <Dropdown
                defaultValue={content?.subscriptionStatus}
                options={[
                  { label: "active", value: "active" },
                  { label: "inactive", value: "inactive" },
                ]}
                classNames="border p-2 rounded-md w-full mb-2 outline-none"
                onChange={(e) => setContent((prev) => ({ ...prev, subscriptionStatus: e }))}
              />
              <label className="text-sm text-gray-500 font-light">Language</label>

              <input
                className="border p-2 rounded-md w-full mb-2 outline-none"
                name="language"
                defaultValue={content?.language}
                onChange={(e) => setContent((prev) => ({ ...prev, language: e.target.value }))}
              />
              <label className="text-sm text-gray-500 font-light">Category</label>

              <input
                className="border p-2 rounded-md w-full mb-4 outline-none"
                name="category"
                defaultValue={content?.category}
                onChange={(e) => setContent((prev) => ({ ...prev, category: e.target.value }))}
              />

              <button
                className="border py-2 px-5 mr-4 rounded-md w-full text-sky-800 hover:text-white hover:bg-sky-800 border-sky-800"
                onClick={onSubmit}>
                Submit
              </button>
            </div>
          ) : (
            <div>
              <h1 className="mb-4 text-center">Are you sure you want to delete this record?</h1>

              <div className="flex justify-center">
                <button className="border py-2 px-5 mr-4 rounded-md" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button
                  onClick={() => onDeleteSubmit(content!.id!)}
                  className="border py-2 px-5 rounded-md hover:border-red-500 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      </Modal>

      <div className="flex justify-start mb-2">
        <button
          onClick={() => {
            setOpen(true);
            setContent({ type: "create" });
          }}
          className="hover:bg-sky-800 hover:text-white border-sky-800 rounded-md border p-2 text-sky-800 mr-4">
          Create magazine
        </button>

        <Dropdown
          defaultValue={subscriptionFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          classNames="hover:bg-sky-800 hover:text-white border-sky-800 rounded-md border p-2 text-sky-800 cursor-pointer w-20 relative text-center"
          onChange={(e) => setSubscriptionFilter(e)}
        />
      </div>

      <div className="border rounded-xl text-sky-800 overflow-hidden">
        <div className="grid grid-cols-9 border-b p-3 bg-gray-200">
          <p>ID</p>
          <p className="col-span-2">Title</p>
          <p className="col-span-2">Description</p>
          <p>Subscription</p>
          <p>Language</p>
          <p>Category</p>
          <p>Actions</p>
        </div>

        {data.length ? (
          data
            .filter((magazine) =>
              subscriptionFilter !== "all"
                ? magazine.subscriptionStatus === subscriptionFilter
                : magazine
            )
            .map((magazine) => {
              const { id, title, description, subscriptionStatus, language, category } = magazine;

              return (
                <div key={id} className="grid grid-cols-9 border-b last:border-0 p-3">
                  <p>{id}</p>
                  <p className="col-span-2">{title}</p>
                  <p className="col-span-2 truncate">{description}</p>
                  <p>{subscriptionStatus}</p>
                  <p>{language}</p>
                  <p>{category}</p>
                  <div className="flex">
                    <PencilSquareIcon
                      className="w-5 mr-2 cursor-pointer"
                      onClick={() => onRecordClick({ ...magazine, type: "edit" })}
                    />
                    <TrashIcon
                      className="w-5 cursor-pointer"
                      onClick={() => onRecordClick({ ...magazine, type: "delete" })}
                    />
                  </div>
                </div>
              );
            })
        ) : (
          <p className="p-3">No Data found! Try creating some records</p>
        )}
      </div>
    </div>
  );
};

export default App;
