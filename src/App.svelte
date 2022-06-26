<script>
  import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "./firebase";
  import Toastify from "toastify-js";

  let task = {
    title: "",
    description: "",
  };
  let tasks = [];
  let editStatus = false;
  let currentId = "";
  // Save Task
  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), task);
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tasks", currentId), task);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      if (!editStatus) {
        addTask();
        Toastify({
          text: "Task Added",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor:
            "linear-gradient(to right, #f6d365 0%, #fda085 100%)",
          stopOnFocus: true,
          onClick: function () {
            this.close();
          },
        }).showToast();
      } else {
        updateTask();
        Toastify({
          text: "Task Updated",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor:
            "linear-gradient(to right, #37C1C1 0%, #6537C1 100%)",
          stopOnFocus: true,
          onClick: function () {
            this.close();
          },
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }
    task = {
      title: "",
      description: "",
    };
    editStatus = false;
    currentId = "";
  };
  // Get Tasks
  onSnapshot(
    collection(db, "tasks"),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    },
    (err) => {
      console.log(err);
    }
  );
  // Delete Task
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      Toastify({
        text: "Task Deleted",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #C1374E 0%, #E50000 100%)",
        stopOnFocus: true,
        onClick: function () {
          this.close();
        },
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  };
  // Update Task
  const editTask = (currentTask) => {
    task.title = currentTask.title;
    task.description = currentTask.description;
    currentId = currentTask.id;
    editStatus = true;
  };
</script>

<main class="container p-5">
  <div class="row">
    <div class="col-md-5">
      <form
        on:submit|preventDefault={handleSubmit}
        class="card card-body rounded shadow-xl text-dark"
      >
        <div class="mb-3">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control text-dark"
            name="title"
            placeholder="Write a Title"
            bind:value={task.title}
          />
        </div>
        <div class="mb-3">
          <label for="description">Description</label>
          <textarea
            class="form-control text-dark"
            name="description"
            rows="3"
            placeholder="Write a Description"
            bind:value={task.description}
          />
        </div>
        <button class="btn btn-success">
          {editStatus ? "Update" : "Save"}
        </button>
      </form>
    </div>
    <!-- List -->
    <div class="col-md-7">
      {#each tasks as task}
        <div class="card card-body rounded shadow-xl m-3 p-2">
          <h1 class="display-5 fw-bold text-success">{task.title}</h1>
          <p class="fs-5 fw-bold text-dark">{task.description}</p>
          <div class="d-flex justify-content-end w-100">
            <button
              class="btn btn-dark btn-sm rounded shadow my-2"
              on:click={handleDelete(task.id)}
            >
              <i class="material-icons">delete</i>
            </button>
            <button
              class="btn btn-info btn-sm m-2 rounded shadow"
              on:click={editTask(task)}
            >
              <i class="material-icons">edit</i>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
</style>
