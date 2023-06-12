import axios from 'axios';

const REST_API_SERVER = 'http://localhost:2014';

// Task management
export function getAllTasksApi(authToken) {
    return axios.get(`${REST_API_SERVER}/api/v1/task/getAllTasks`, { 
        headers: {"Authorization" : `Bearer ${authToken}`}
    });
}
export function getTaskByNamesApi(authToken, task_name) {
    const query = `?task_name=${task_name}`;
    return axios.get(`${REST_API_SERVER}/api/v1/task/getAllTaskByNames${query}`, { 
        headers: {"Authorization" : `Bearer ${authToken}`}
    });
}

export function deleteTaskApi(task_id, authToken) {
    return axios.delete(`${REST_API_SERVER}/api/v1/task/deleteTask`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        data: {
            tid: task_id
        }
    });
}
export function editTaskApi(task_id, task_data, authToken) {
    return axios.put(`${REST_API_SERVER}/api/v1/task/editTask`, { task_id, task_data }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
    });
}
export function createNewTaskApi(user_id, task_data, authToken) {
    return axios.post(`${REST_API_SERVER}/api/v1/task/createNewTask`, { user_id, task_data }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
    });
}