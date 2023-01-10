function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <>
      <li>
        {place.title}
        <button
          onClick={() => {
            onComplete(parentId, id);
          }}>
          Complete
        </button>
      </li>
      {childIds.length > 0 && (
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={parentId}
              placesById={placesById}>
              onComplete={onComplete}
            </PlaceTree>
          ))}
        </ol>
      )}
    </>
  );
}
function handleComplete(parentId, childId) {
  const parent = plan[parentId];
  const nextParent = {
    ...parent,
    childIds: parent.childIds.filter(id => id !== childId),
  };
  setPlan({
    ...plan,
    [parentId]: nextParent,
  });
}

function handleComplete2(parentId, childId) {
  // import {useImmer} from 'use-immer'
  // const [plan ,updatePlan] =useImmer(initialTravelPlan)
  //
  updatePlan(draf => {
    const parent = draf[parentId];
    parent.childIds = parent.childIds.filter(id => id !== childId);
    deleteAllChildren(childId);
    function deleteAllChildren(id) {
      const place = draf[id];
      place.childIds.forEach(deleteAllChildren);
      delete draft[id];
    }
  });
}

const root = plan[0];
const planetIds = root.childIds;
return (
  <>
    <h2>Places to visit</h2>
    <ol>
      {planetIds.map(id => (
        <PlaceTree
          key={childId}
          id={childId}
          parentId={0}
          placesById={placesById}
          onComplete={onComplete}></PlaceTree>
      ))}
    </ol>
  </>
);
// reducer用法
function handleAddTask(text) {
  dispatchEvent({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatchEvent({
    type: 'changed',
    task: task,
  });
}

function handleAddTask(textId) {
  dispatchEvent({
    type: 'deleted',
    id: textId,
  });
}
function taskReudcer(tasks, action) {
  switch (action.type) {
    // 同if elseif
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }

    case 'changed': {
      return tasks.map(task => {
        if (task.id === action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });
    }

    case 'deleted': {
      return tasks.filter(i => taskReudcer.id !== action.id);
    }

    default:
      throw Error('unknow action:' + action.type);
  }
}

import {createContext,useContext} from 'react'
const LevelContext=createContext(1)
// import {levelContext} from './levelContext.js'
const level =useContext(levelContext)
// 这样无需prop传递level
function Section({children}){
    return (
        <section>
            <LevelContext.Provider value={level+1}>
                 {children}
            </LevelContext.Provider>
           
        </section>
    )
}
/* myReact useReducer */
import {useState} from 'react'
export function useReducer(reducer,initialState){
    const [state,setState] = useState(initialState)
    function dispatch(action){
        const nextState = reducer(state, action);
        setState(nextState)
    }
    return [state,dispatch]
}
// TasksProvider.js
export const tasksContext= createContext(null)
export const tasksDispatchContext= createContext(null)
const taskReducer(tasks,action){
    switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
}
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
export function TasksProvider({children}){
    const [tasks,dispatch]=useReducer(taskReducer,initialTasks) 
    return (
        <tasksContext.Provider value={tasks}>
            <tasksDispatchContext.Provider value={dispatch}>
                {children}
            </tasksDispatchContext.Provider>
        </tasksContext.Provider>
    )
}
// 使用provider 
//  <TasksProvider>{children div}</TasksProvider>
// tasksContext.js 
export function useTasks(){
    return useContext(tasksContext)
}
export function useTasksDispatch(){
    return useContext(tasksDispatchContext)
}
//当组件使用上下文时通过引入上行数执行
const tasks=useTasks()
const dispatch=useTasksDispatch()

 function curry(fn,...args) {
    return fn.length<=args.length?fn(...args):curry.bind(null,fn,...arg)
}
function curry(fn, ...args) {
return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

// 自定义组件使用ref获得DOM 要使用forwordRef
const MyInput =forwardRef((props,ref)=>{
  const realInputRef=useRef(null)
  useImperativeHandle(ref,()=>({
    // only expose focus and nothing else 限制ref获得的DOM公开的功能
    focus(){
      realInputRef.current.focus()
    }
  }))
  return <input prop={...props} ref={realInputRef} />
})
// React的状态更新需要排队，手动添加项目时不会立即更新DOM所以操作会滞后，此时需要将操作DOM函数包装在flushSync中
function Todolist(){
  let initialTodos = [];
  const [todos,setTodos]=useState(initialTodos)
  function handleAdd(){
    const newTodo={id:nextId++,text:text}
    flushSync(()=>{
      // 更新DOM的操作放里面 就可以顺序执行下面操作DOM操作
      setTodos([...todos,newTodo])
      
    })
    listRef.current.lastChild.scrollIntoView();
  }
}
