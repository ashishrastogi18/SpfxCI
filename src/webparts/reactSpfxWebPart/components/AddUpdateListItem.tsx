import * as React from 'react';
import {
    PrimaryButton, DefaultButton,
    TextField,
    Panel, PanelType,
    Dropdown, DropdownMenuItemType, IDropdownOption,
    Label
  } from 'office-ui-fabric-react/lib';

import * as MyModel from '../Model/Mymodel';
import pnp from "sp-pnp-js";
export interface IHeroProjectsEditorComponentProps {
    heroProject: MyModel.IHeroProjectItem;
    showHeroProjectEditor: boolean;
    onCloseForm:() => any;
    onAddNewItem: () => any;
    onUpdateItem: () => any;
    listName: string;
  }
  
  export interface IHeroProjectsEditorComponentState {
    item: MyModel.IHeroProjectItem;
    disableButtons: boolean;
    projectColorChoices: string[];
  }
  export default class HeroProjectsEditorComponent extends React.Component<IHeroProjectsEditorComponentProps, IHeroProjectsEditorComponentState> {
    
      // ---------- init ---------------
    
      constructor(props: IHeroProjectsEditorComponentProps, state: IHeroProjectsEditorComponentState) {
        super(props);
    
        this.state = {
          item: this.NewItemFactory(),
          disableButtons: false,
          projectColorChoices: []
        };
      }
    //Initializing New Item default values
      private NewItemFactory(): MyModel.IHeroProjectItem {
        return {
          _isNewItem: true,
          ID: (new Date()).getTime(),
          ProjectColor: "Blue",
          Title: ""
        };
      }
   
    //By the time componentDidMount is called, the component has been rendered once.
//In practice, componentDidMount is the best place to put calls to fetch data, for two reasons
      public componentDidMount() {
    alert("AddUpdateDidmountGetColors" + this.props.listName);
        pnp.sp.web.lists.getByTitle(this.props.listName).fields.getByInternalNameOrTitle("ProjectColor").get().then((fieldInfo: any) => {
          if (fieldInfo.Choices != null && fieldInfo.Choices.length > 0) {
            this.setState(x => {
              x.projectColorChoices = fieldInfo.Choices as string[];
              return x;
            });
          }
        });
      }
    /*So why do we need componentWillReceiveProps? 
    This is the first hook that allows us to look into the upcoming Update. 
    Here we could extract the new props and update our internal state. 
    If we have a state that is a calculation of multiple props, we can safely apply the logic here and store the result using this.setState().+
    Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render. */
      public componentWillReceiveProps(nextProps: IHeroProjectsEditorComponentProps) {
    alert("I am chnaging states : ComponentWillReceiveProp")
        /* if (this.props.heroProject == nextProps.heroProject) {
          return;
        } */
    
        this.setState(x => {
          x.item = nextProps.heroProject == null ? this.NewItemFactory() : this.ObjectCloner({}, nextProps.heroProject);
          return x;
        });
      }
    
      private ObjectCloner(target, varArgs) {
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
    
        let to = Object(target);
    
        for (let index = 1; index < arguments.length; index++) {
          let nextSource = arguments[index];
           alert(nextSource);
          if (nextSource != null) { // Skip over if undefined or null
            for (let nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
    
        return to;
      }
    
      // ---------- saving ---------------
    
      private _handleSubmit() {
    
        this.setState(x => {
          x.disableButtons = true;
          return x;
        }, () => {
       // checking mandatory fields 
          if (!this.validateAlways()) {
    
            this.setState(x => {
              x.disableButtons = false;
              return x;
            });
    
          }
          else {
            //updating items 
            if (!this.state.item._isNewItem) {
    
              let spObj: MyModel.IHeroProjectItem = {
                ID: this.state.item.ID,
                ProjectColor: this.state.item.ProjectColor,
                Title: this.state.item.Title
              };
              alert("handleSubmit" + this.props.listName);
              pnp.sp.web.lists.getByTitle(this.props.listName).items.getById(spObj.ID).update(spObj).then((resp) => {
    
                this.props.onUpdateItem();
    
              }).catch((e) => {
    
                alert("Error updating item, check console.");
                console.log(e);
                console.log(spObj);
    
              }).then(() => {
    
                setTimeout(() => {
                  this.setState(x => {
                    x.disableButtons = false;
                    return x;
                  });
                }, 800);
    
              });
    
            }
            else {
    
              if (!this.validateNew()) {
    
                this.setState(x => {
                  x.disableButtons = false;
                  return x;
                });
    
              }
              else {
                //Adding
                let spObj: MyModel.IHeroProjectItem = {
                  ProjectColor: this.state.item.ProjectColor,
                  Title: this.state.item.Title
                };
    
                pnp.sp.web.lists.getByTitle(this.props.listName).items.add(spObj).then(resp => {
                  return resp.data;
                }).then((resp) => {
    
                  this.props.onAddNewItem();
    
                }).catch((e) => {
    
                  alert("Error adding new item, check console.");
                  console.log(e);
                  console.log(spObj);
    
                }).then(() => {
    
                  setTimeout(() => {
                    this.setState(x => {
                      x.disableButtons = false;
                      return x;
                    });
                  }, 800);
    
                });
              }
            }
          }
        });
      }
    
      private validateAlways(): boolean {
    
        if (!!this.state.item.Title == false) {
          alert("Title is required.");
          return false;
        }
    
        if (!!this.state.item.ProjectColor == false) {
          alert("Project Color is required.");
          return false;
        }
    
        return true;
      }
    
      private validateNew(): boolean {
        return true;
      }
    
      // ---------- canceling ---------------
    
      private _handleDismissPanel() {
        this.props.onCloseForm();
    
        this.setState(x => {
          x.item = this.NewItemFactory();
          return x;
        });
      }
    
      // ---------- controlled inputs,setting states ---------------
    
      private _handleTitleChange(text: string) {
        this.setState(x => {
          x.item.Title = text;
          return x;
        });
      }
    
      private _handleProjectColorChange(item: IDropdownOption) {
        this.setState(x => {
          x.item.ProjectColor = item.text;
          return x;
        });
      }
    
      // ---------- render ---------------
    
      public render(): React.ReactElement<IHeroProjectsEditorComponentProps> {
    
        let _ddlItems = this.state.projectColorChoices.map((v: string) => {
          return { "key": v, "text": v };
        });
    
        return (
          <div>
    
            <Panel
              isOpen={this.props.showHeroProjectEditor}
              type={PanelType.medium}
              onDismiss={this._handleDismissPanel.bind(this)}
              hasCloseButton={false}
              headerText='Add Hero Project'
              closeButtonAriaLabel='Close'
              isLightDismiss={true}
              onRenderFooterContent={() => {
                return (
                  <div>
                    <PrimaryButton
                      disabled={this.state.disableButtons}
                      onClick={this._handleSubmit.bind(this)}
                      style={{ 'marginRight': '8px' }}>
                      Save
                    </PrimaryButton>
                    <DefaultButton
                      disabled={this.state.disableButtons}
                      onClick={this._handleDismissPanel.bind(this)}>
                      Cancel
                    </DefaultButton>
                  </div>
                );
              }}>
              <div>
    
                {
                  !this.state.item._isNewItem && (
                    <div>
                      <TextField
                        label='Id:'
                        value={this.state.item.ID.toString()}
                        disabled={true} />
                    </div>
                  )
                }
    
                <div>
                  <Label required={true}>Name:</Label>
                  <TextField
                    maxLength={80}
                    onChanged={this._handleTitleChange.bind(this)}
                    value={this.state.item.Title} />
                </div>
    
                <div>
                  <Dropdown
                    label='Project Color:'
                    placeHolder='Select an Option'
                    options={_ddlItems}
                    selectedKey={this.state.item.ProjectColor}
                    onChanged={this._handleProjectColorChange.bind(this)}
                  />
                </div>
    
              </div>
    
            </Panel>
    
          </div>
        );
      }
    }
    
   