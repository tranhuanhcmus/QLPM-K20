// Service
import { 
    getAllTasksApi,
    getTaskByNamesApi,
    createNewTaskApi,
    editTaskApi,
    deleteTaskApi,
} from './Api';
import UserService from './UserService';

/**
 * Service class for managing tasks.
 * This service follows the Singleton design pattern to provide a single instance across the application.
 */
class TaskService {
  static instance = null;

  /**
   * Get the singleton instance of TaskService.
   * @returns {TaskService} The instance of TaskService.
   */
  static getInstance() {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  serviceHandleGetAllTasks = () => {
    return new Promise ((resolve, reject) => {
        const authToken = UserService.getAuthToken();
        if(!authToken) {
            resolve({status_code: 403});
        } 
        else {
            getAllTasksApi(authToken)
                .then(res => {
                    resolve({data: res.data, status_code: 200});
                })
                .catch(error => {
                    if(error.response && (error.response.status === 403 || error.response.status === 403)) {
                        // to do to re-login
                        resolve({status_code: error.response.status});
                    }
                    else {
                        reject(error);
                    }
                })
        }
    })
  }
  serviceSetTasksByName = (task_name) => {
    return new Promise ((resolve, reject) => {
        const authToken = UserService.getAuthToken();
        if(!authToken) {
            resolve({status_code: 403});
        } 
        else {
            getTaskByNamesApi(authToken, task_name)
                .then(res => {
                    resolve({data: res.data, status_code: 200});
                })
                .catch(error => {
                    if(error.response && (error.response.status === 403 || error.response.status === 403)) {
                        // to do to re-login
                        resolve({status_code: error.response.status});
                    }
                    else {
                        reject(error);
                    }
                })
        }
    })
  }
  serviceHandleCreateTask = (user_id, task_data) => {
    return new Promise ((resolve, reject) => {
        const authToken = UserService.getAuthToken();
        if(!authToken) {
            resolve({status_code: 403});
        } 
        else {
            createNewTaskApi(user_id, task_data, authToken)
                .then(res => {
                    resolve({res, status_code: 200});
                })
                .catch(error => {
                    if(error.response && (error.response.status === 403 || error.response.status === 403)) {
                        // to do to re-login
                        resolve({status_code: error.response.status});
                    }
                    else {
                        reject(error);
                    }
                })
        }
    })
  }
  serviceHandleEditTask = (task_id, task_data) => {
    return new Promise ((resolve, reject) => {
        const authToken = UserService.getAuthToken();
        if(!authToken) {
            console.log('token is not exist serviceHandleGetAllTasks')
            resolve(403);
        } 
        editTaskApi(task_id, task_data, authToken)
            .then(res => {
                resolve({res, status_code: 200});
            })
            .catch(error => {
                if(error.response && error.response.status === 403) {
                    // to do to re-login
                    console.log('expire token serviceHandleEditTask')
                }
                reject(error);
            })
    })
  }
  serviceHandleDeleteTask = (task_id) => {
    return new Promise ((resolve, reject) => {
        const authToken = UserService.getAuthToken();
        if(!authToken) {
            console.log('token is not exist serviceHandleGetAllTasks')
            resolve(403);
        } 
        deleteTaskApi(task_id, authToken)
            .then(res => {
                resolve({res, status_code: 200});
            })
            .catch(error => {
                if(error.response && error.response.status === 403) {
                    // to do to re-login
                    console.log('expire token serviceHandleDeleteTask')
                }
                reject(error);
            })
    })
  }
}

export default TaskService.getInstance();
