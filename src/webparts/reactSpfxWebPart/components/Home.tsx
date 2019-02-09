import * as React from 'react';
import AppComponent from './App';
import { IReactSpfxWebPartProps } from './IReactSpfxWebPartProps';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

//This is the entry point of React Component 
//This calls the App Component and Passes url & ListName Properties from Webpart to App Component
  export default class ReactHome extends React.Component<IReactSpfxWebPartProps,void>
  {
    public render(): React.ReactElement<IReactSpfxWebPartProps> {
      return (
        <div>
          <AppComponent
          url = {this.props.siteurl}
          ListName ={this.props.listName}
          />
        </div>
      );
       
    }
  }