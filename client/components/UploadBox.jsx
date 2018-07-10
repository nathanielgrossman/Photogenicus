import React, { Component } from 'react';

export default class UploadBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="uploadbox">
            <form action="http://localhost:5000/upload" className="dropzone" method="post" encType="multipart/form-data">
                <div className="fallback">
                    <input name="file" type="file" multiple />
                </div>
            </form>    
     </div>
    )
  }
}
