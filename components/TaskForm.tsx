'use client';

import TaskInputFields from '@/components/TaskInputFields';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export type TaskInputField = {
  [key in 'title' | 'description']: {
    value: string;
    error: string;
  };
};

export default function TaskForm() {
  const [inputFields, setInputFields] = useState<TaskInputField[]>([
    {
      title: {
        value: '',
        error: '',
      },
      description: {
        value: '',
        error: '',
      },
    },
  ]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputFields];
    onChangeValue[index][name as 'title' | 'description'].value = value;
    setInputFields(onChangeValue);
  };

  const handleAddInput = () => {
    let currentInputFields = [...inputFields];
    if (inputFields[inputFields.length - 1].title.value === '') {
      console.log('Last task title is empty...');
      let lastInputFieldIndex =
        currentInputFields.length === 1
          ? 0
          : currentInputFields.length === 2
          ? 1
          : currentInputFields.length - 1;

      currentInputFields[lastInputFieldIndex].title.error =
        'Task title is required';

      setInputFields(currentInputFields);
      return;
    }

    const mapInputFields = currentInputFields.map((item) => {
      if (item.title.error !== '') {
        item.title.error = '';
      }

      if (item.description.error !== '') {
        item.description.error = '';
      }

      return item;
    });

    setInputFields([
      ...mapInputFields,
      {
        title: {
          value: '',
          error: '',
        },
        description: {
          value: '',
          error: '',
        },
      },
    ]);
  };

  return (
    <div className="max-w-[40rem] divide-y-2">
      {inputFields.map((item, i) => (
        <TaskInputFields
          key={i}
          item={item}
          index={i}
          onChange={handleChange}
        />
      ))}
      <div className="w-full pt-5">
        <Button size="icon" className="w-full" onClick={handleAddInput}>
          <Plus size={30} />
        </Button>
      </div>
    </div>
  );
}
