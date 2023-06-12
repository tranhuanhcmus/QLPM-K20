import React, { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Style
import '../../assets/styles/scss/_common_component.scss'

// Layout
import TaskConfiguration from '../layouts/TaskConfiguration';

// Helpers
import { toggleClassNoListener, toggleClass } from '../../utils/helpers/ToggleClass';

// Redux
import { useDispatch } from 'react-redux';
import {
    deleteTask,
} from '../../redux/actions/tasks.action';

// Service
import TaskService from '../../services/TaskService';

const Task = ({task}) => {
    const [isTaskConfigActive, setIsTaskConfigActive] = useState(false);
    const moreOpDropdownRef = useRef(null);
    const reduxDispatch = useDispatch(); // This redux help delete task feature
    const navigate = useNavigate();

    const renderTag = (tags) => {
        const tag_react_element = tags.map((t, i) => {
            return (
                <div 
                    className="cc-task__tag" 
                    style={{backgroundColor: t.background_color} }
                    key={`tag@${t.tag_name, i}`}
                >
                    <p>{t.tag_name}</p>
                </div>
            )
        })
        return (
            tag_react_element
        )
    }
    const handleDeleteTask = () => {
        // Call api to detele task on database
        TaskService.serviceHandleDeleteTask(task.id)
            .then(response => {
                if(response.status_code === 401 || response.status_code === 403) {
                    // Navigate to login
                    navigate('/login');
                }
                else {
                    return response;
                }
            })
            .catch(error => {
                console.log(error)
            })

        // Delete task in state to update interface
        reduxDispatch(deleteTask(task.id))
    }
    return (
        <>
            <div className='common-component__task'>
                <div className="cc-task__tag-list">
                    {renderTag(task.tags)}
                </div>
                <h6 className='cc-task__title'>{task.task_name}</h6>
                <p className='cc-task__description'>{task.description}</p>
                <div className="cc-task__duedate">
                    <p>{task.due_date}</p>
                </div>
                <div className="cc-task__more-options-wrapper">
                    <div className="cc-task__more-options">
                        <button onClick={() => toggleClass(moreOpDropdownRef.current, 'active')}>
                            <i className="fi fi-br-menu-dots-vertical"></i>
                        </button>
                        <div className="cc-task__more-options-dropdown" ref={moreOpDropdownRef}>
                            <button onClick={() => {
                                setIsTaskConfigActive(!isTaskConfigActive);
                                toggleClassNoListener(moreOpDropdownRef.current, 'active');
                            }}>
                                <i className="fi fi-rs-magic-wand"></i>
                                <span>Edit task</span>
                            </button>
                            <button onClick={handleDeleteTask}>
                                <i className="fi fi-rr-trash"></i>
                                <span>Delete Task</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <TaskConfiguration isShow={isTaskConfigActive} type={'edit'} task_data={task}/>
        </>
    );
}

export default memo(Task);
