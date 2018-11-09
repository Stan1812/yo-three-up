'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the excellent ${chalk.red(
          'generator-rollup-three',
        )} generator!`,
      ),
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true,
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'input your peoject name',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'description',
        message: 'description',
      },
      {
        type: 'input',
        name: 'author',
        message: 'author',
        default: this.user.git.name(),
      },
      {
        type: 'input',
        name: 'email',
        message: 'email',
        default: this.user.git.email(),
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      (this.projectOutput = './dist'),
      this.directory(this.projectAssets, 'src'),
      this.copy('.rollup.config.js', '.rollup.config.js'),
      this.copy('.babelrc', '.babelrc'),
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      { title: this.appname },
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        email: this.props.email,
      },
    );
  }

  install() {
    this.installDependencies();
  }
  end() {
    this.log(yosay('Your front templates has been created successfully!'));
  }
};
