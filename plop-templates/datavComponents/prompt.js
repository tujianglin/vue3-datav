module.exports = {
  description: 'generate a component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name:',
      validate(value) {
        if (!value || value.trim === '') {
          return 'name is required';
        }
        return true;
      },
    },
  ],
  actions: (data) => {
    const name = data.name.slice(0, 1).toLowerCase() + data.name.slice(1);
    const dir = `${process.cwd()}/src/datavComponents/${name}`;
    const actions = [
      {
        type: 'add',
        path: `${dir}/index.ts`,
        templateFile: './datavComponents/index-ts.hbs',
        data: {
          name: data.name,
        },
      },
      {
        type: 'add',
        path: `${dir}/src/index.vue`,
        templateFile: './datavComponents/index.hbs',
        data: {
          name: data.name,
        },
      },
      {
        type: 'add',
        path: `${dir}/src/config.vue`,
        templateFile: './datavComponents/config.hbs',
        data: {
          name: data.name,
        },
      },
      {
        type: 'add',
        path: `${dir}/src/index.ts`,
        templateFile: './datavComponents/src-index-ts.hbs',
        data: {
          name: data.name,
        },
      },
    ];
    return actions;
  },
};
