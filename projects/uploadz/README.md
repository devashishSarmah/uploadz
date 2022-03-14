# Uploadz

Angular NPM Package to upload files using multiple observer design patterns.

## Table of contents
* [How to use](#howtouse)
* [Models](#models)

<h2 id="howtouse">How to use</h2>

Install the package
```
npm i uploadz
```
Inject the `UploadzService` Injectable

```import { UploadzService } from 'uploadz';```

```contructure(uploadzService: UploadzService) {}```

Using the `uploadFiles` method specifying `files to upload` and the `endpoint` 

Method Signature `uploadFiles(files: File[], url: string): Observable<any>[];`

For each `UploadRequest`, A prettified Response Gets returned

`'Request has been made!'`
`Response header has been received!`
`File has been uploaded!`
<br>
For each event type : `progress`
<br>
 Response of type Progress gets returned
 ```
 {
        percentage: 0,
        uploaded: 0,
        totalSize: 0,
        estimateTime: '0 Seconds',
  }
 ```

<h2 id="models">Models</h2>

`UploadRequest` Model

```
type UploadRequest = {
  url: string;
  file: File;
};
```

`Progress` Model

```
type Progress = {
  percentage: number;
  uploaded: number;
  totalSize: number;
  estimateTime: string;
};
```


