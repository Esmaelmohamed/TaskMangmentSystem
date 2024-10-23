import React from "react"; // Importing React to create components.
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md"; // Importing Material Design icons.
import { LuClipboardEdit } from "react-icons/lu"; // Importing additional icons.
import { FaNewspaper, FaUsers } from "react-icons/fa"; // More icons from Font Awesome.
import { FaArrowsToDot } from "react-icons/fa6"; // Additional icons.
import moment from "moment"; // Importing moment.js for date formatting.
import { summary } from "../assets/data"; // Importing summary data from assets.
import clsx from "clsx"; // Importing clsx for conditional class names.
import { Chart } from "../components/Chart"; // Importing a Chart component.
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils"; // Importing utility functions and constants.
import UserInfo from "../components/UserInfo"; // Importing a UserInfo component.

const TaskTable = ({ tasks }) => {
  // Define icons for different task priorities.
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  // Component for the table header.
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  // Component for each task row.
  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} /> {/* Display user information */}
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()} {/* Display time since created */}
        </span>
      </td>
    </tr>
  );

  return (
    <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} /> // Render each task row
          ))}
        </tbody>
      </table>
    </div>
  );
};

// UserTable component to display a list of users.
const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  // Component for each user row.
  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span> {/* Display user initials */}
          </div>
          <div>
            <p>{user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td> {/* Display time since created */}
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} /> // Render each user row
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Dashboard component to aggregate TaskTable and UserTable.
const Dashboard = () => {
  const totals = summary.tasks; // Access total tasks from summary.

  // Statistics to display in cards.
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  // Card component to display individual statistics.
  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"110 last month"}</span> {/* Placeholder for last month's data */}
        </div>
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon} {/* Render the icon for the card */}
        </div>
      </div>
    );
  };

  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} /> // Render each stats card
        ))}
      </div>

      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>Chart by Priority</h4>
        <Chart /> {/* Render the Chart component */}
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        <TaskTable tasks={summary.last10Task} /> {/* Render TaskTable with the last 10 tasks */}
        <UserTable users={summary.users} /> {/* Render UserTable with user data */}
      </div>
    </div>
  );
};

export default Dashboard; // Export the Dashboard component for use in other parts of the application.
