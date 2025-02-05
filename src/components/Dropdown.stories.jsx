import Dropdown from "./Dropdown";
import "../../src/styles/global.css"; 

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    label: { control: "text" },
    multiple: { control: "boolean" },
    withSearch: { control: "boolean" },
    options: { control: "object" },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Select an option",
  multiple: false,
  withSearch: true,
  options: [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ],
};
