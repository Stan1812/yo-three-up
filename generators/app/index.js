'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the excellent ${chalk.red('generator-rollup-three')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'input your peoject name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'description'
      },
      {
        type: 'input',
        name: 'author',
        message: 'author',
        default: this.user.git.name()
      },
      {
        type: 'input',
        name: 'email',
        message: 'email',
        default: this.user.git.email()
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  paths() {
    this.sourceRoot();
    // Returns './templates'
    this.templatePath('index.js');
    // Returns './templates/index.js'
  }

  configuration() {
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('_babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(
      this.templatePath('rollup.config.js'),
      this.destinationPath('rollup.config.js')
    );
    this.fs.copy(
      this.templatePath('_eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );
  }

  writing() {
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('dist'), this.destinationPath('dist'));

    this.fs.copy(this.templatePath('index.html'), this.destinationPath('index.html'), {
      title: this.appname
    });

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        email: this.props.email
      }
    );
  }

  generateClient() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    this.destinationPath('./');
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    this.log(yosay('Your front templates has been created successfully!'));
  }
};
