/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //app.initialize();
    setupSafariButton();  
}

window.handleDeepLink2 = function(params) {
    alert('handleDeepLink');
    console.log("Deep link received with parameters:", params);
    
    // Access specific parameters
    if (params.action) {
        switch(params.action) {
            case 'view':
                if (params.id) {
                    // Navigate to a specific view with the given ID
                    app.navigate('view/' + params.id);
                }
                break;
            case 'search':
                if (params.query) {
                    // Perform a search with the query
                    app.search(params.query);
                }
                break;
            // Handle other actions
        }
    }
    
    // You might want to dispatch an event for other parts of your app
    document.dispatchEvent(new CustomEvent('deepLinkReceived', {
        detail: params
    }));
};

function setupSafariButton() {
    const safariButton = document.getElementById('openSafariBtn');
    if (safariButton) {
        safariButton.addEventListener('click', function() {
            //alert('cccccc');
            openUrl('https://test.safetynet.dk/SafetyNetDev_UAT/Mobile/AppLink.aspx?d=c2Nhbm5lZENvZGU9MTIzMCAtIEJ1aWxkaW5nIGNhbGM=', false);
        });
    } else {
        console.error('Safari button not found in the DOM');
    }
}


window.handleDeepLink = function(params) {
    var originalUrl = params.originalURL;
    console.log("Original URL:", originalUrl);
    // Process other parameters
};

window.sampleMethod = function(){
    alert('Sample Opener method....')
}
// Safari View Controller helper function
function openUrl(url, readerMode) {
    //alert('sss');
  SafariViewController.isAvailable(function (available) {
    if (available) {
      SafariViewController.show({
            url: url,
            hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
            animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
            transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
            enterReaderModeIfAvailable: readerMode, // default false
            tintColor: "#00ffff", // default is ios blue
            barColor: "#0000ff", // on iOS 10+ you can change the background color as well
            controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
          },
          // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
          function(result) {
            if (result.event === 'opened') {
              console.log('opened');
            } else if (result.event === 'loaded') {
              console.log('loaded');
            } else if (result.event === 'closed') {
              console.log('closed');
            }
          },
          function(msg) {
            console.log("KO: " + msg);
          })
    } else {
      // potentially powered by InAppBrowser because that (currently) clobbers window.open
      window.open(url, '_blank', 'location=yes');
    }
  })
}


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    fileName: "PointerEventsCordovaPlugin.wmv",
    uriString: "http://media.ch9.ms/ch9/8c03/f4fe2512-59e5-4a07-bded-124b06ac8c03/PointerEventsCordovaPlugin.wmv",  // 38.3 MB
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    downloadFile: function(uriString, targetFile) {

        var lblProgress = document.getElementById('lblProgress');

        var complete = function() {
            lblProgress.innerHTML = 'Done';
        };
        var error = function (err) {
            console.log('Error: ' + err);
            lblProgress.innerHTML = 'Error: ' + err;
        };
        var progress = function(progress) {
            lblProgress.innerHTML = (100 * progress.bytesReceived / progress.totalBytesToReceive) + '%';
        };

        try {

            var downloader = new BackgroundTransfer.BackgroundDownloader();
            // Create a new download operation.
            var download = downloader.createDownload(uriString, targetFile);
            // Start the download and persist the promise to be able to cancel the download.
            app.downloadPromise = download.startAsync().then(complete, error, progress);

        } catch(err) {
            console.log('Error: ' + err);
        }
    },
    downloadPromisesList:[],
    downloadSingleFile:function(uriString){
        var lblProgress = document.getElementById('lblProgress');
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            var testFileName = "Sample_"+ Date.now()+ ".mp4";
            fileSystem.root.getFile(testFileName, { create: true }, function (newFile) {
                console.log('########-'+JSON.stringify(newFile));
                
                var complete = function() {
                    lblProgress.innerHTML = 'Done';
                };
                var error = function (err) {
                    console.log('Error: ' + err);
                    lblProgress.innerHTML = 'Error: ' + err;
                };
                var progress = function(progress) {
                    var progressText = (100 * progress.bytesReceived / progress.totalBytesToReceive) + '%';
                    lblProgress.innerHTML = progressText;
                };

                try {

                    var downloader = new BackgroundTransfer.BackgroundDownloader();
                    // Create a new download operation.
                    var download = downloader.createDownload(uriString, newFile);
                    // Start the download and persist the promise to be able to cancel the download.
                    download.startAsync().then(complete, error, progress);
                    
                } catch(err) {
                    console.log('Error: ' + err);
                }
            });
        });
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.getElementById('btnStart').addEventListener('click', this.startDownload);
        document.getElementById('btnStop').addEventListener('click', this.stopDownload);
        document.getElementById('btnFileInfo').addEventListener('click', this.getFileInfo);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.startDownload();
    },

    startDownload: function () {
        var downloadList = [
            {
              "Id": "18",
              "Text": "Fald fra højden (Id:7 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Fald fra hoejden.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=GirqYlP8jnkWk2Fk7v5BzSr05GgtsCg2%2BI33WO2dQ9vvCyr7kDe2k%2FU8PJFR3hdlCYya%2FSX2LPgo00DtTELYHhEignXYGEaoAvTWO%2BXLQ9bx%2F5YdS3vPgofTYL2lgKjnso0AdQG3odQDb6olySJ2vsnteCWh%2BGbwILYbTDgdZCMzU4cjgQGH0H%2FF%2F2tM2%2FOHiddPoLX8VZdsI1ads7AgBToSnfIN94OcwQp27JCxku3Wx792F08ucTlXbha3XgmziH%2B2LSI9qyBTYmxlteIeRfaCsqeDJE7QVAZc4%2BUDBn6TdAT44%2B7lmzTcgHoi563evhUOD6KPgtU6Dgn4B02uBKo562bmjH39B9qvtXouzqexViG0rKuXh3fRVJtwWL40mMcdFfoWr9ZVmahxZjmndjPsF%2BRfWU9MM4w2xWmbiV2zMotorwTFm8SvevP1hxFc",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "19",
              "Text": "Fysisk træning uden ulykker (Id:8 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Fysisk traening uden ulykker.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=EmRjvDDml8Y8R73ipdTSfXVkEN2FQLd2HxMFYu8d8osz%2FmkM2F0BUs33vpGGT6s6OmZ8Ge84zlG2XI2bkgbeKeyclVSqiCTKsTl1ELG0%2Bsy%2BJQSIp9kc7W3CVaxrq2Axwg3XcSdisb0rgB5oXewBgX56oAzQOe8awwkcqi0HuxFTtC%2BeDVTwXAnkB2tt3MIM9xl2V3HyrvVlaA1jkxukpcXL0Q%2BydF0LeU9yny%2ByVsSmgsdzkbZ8Mv0Z%2Fw3R9HaivddlQXWbG6Bg2pPS5rstzufCPwK6PFWxD1bDhDCL31vIS5Fi8LHkdeDkcV5qfjWGXUZVMOovqqWdWX3rlqpKKmaGkXSS44gW2FRC%2BDB55DPo1vFImKJbQtxUvJRxdrrfguH19iP19JwXWCi7t6QHdkWly4w79Pr%2F4iKb8nd2RW%2FGsO4l%2BsXhiFdW87IM2%2Fpk",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "20",
              "Text": "Giv tid (Id:9 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Giv tid.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=CP9AFwLCMYSGZKPR57rQcEMJJsNrQWGcs0vdCm7JJVjE6CpdnjNNXxZqK29BQTnVdWN4C1iqOFTFq%2B5nfz6ZB4D49Gf8e0Z3ShFP9ZVlUczb06r208jnoh6ylAPKSOLY8amHgCWtCYJTYxrSJBtWwdUATKFwnPEKBXMdHPupEmUUucWo2vk6a01kxGc%2Be6Q%2B0RxL0ZBhHYwFt%2BGHEu2Wwm3Tub%2B4K%2BLfvsf0ajyHwgZGjiMpAtcGCGAbXIRiSglVte%2Ff4B675Vtr4xNhfaxZnuZNS9y%2FVjO2%2Fjm2yVSs%2BATx91tqcTTpQysx5xAfjpQkICsgPKvV0utlnT59omiTt6pU03EvC3JTfUuR%2BNRvJthJoCIxcXJnzGHeKMDl99kmjCQ5T8v1HqQmTTQ47XpBXUHZXUcRRueZkZESODIY1Qih%2BOvBdVGBwdqRryTCUZnq",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "21",
              "Text": "Handlepligt (Id:10 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Handlepligt.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=g%2BnTyTN7WywlfM4LrpvsJd5bdozznHIwAPecMFWOiyfWdrvcp4QfOBK5Uijkj8zuPgtnv2CCvaP1fimZCEuKGpEfZ%2BVBWZ6TAk5GBBnzxH14W7jw2FP7teWLyCK8VdbT%2Bm4xQrxCRj8ltKQ3O%2BaNzirlmLwUnwtpNlFP%2F8g%2FyNDWGi8UotKO5Bbsi8PSf%2FVUwsmpXd54UKkUDF8BPalJWw%2BAKczJTdPQIXqNLWAsP4QW3GRq2fFBHjdPf4YhG6hOYV6HBPx%2FGu7D4C9l0dWwCpAppZHbSxFfWxg0kulPV%2B3sMNSLkltk7BmY3QTQkym70Xmzi2K1H5iRX0G9oWyJa0iJUycONzaJg1A8T9HDRo35pC6X3Y9YlO9Gc3G4N9JFOwJdR1xTUMNZnp30r6%2BoBOiWChrzheDAZYttrjOa4w1EIk%2BE1mNpPGjY2iBwZpUn",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "22",
              "Text": "Husk høreværn (Id:11 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Husk hoerevaern.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=R7wSGTp7Q9pMTNHdp8NqwcRCwC5iM1u26aaN2QPlpuX%2FM2FcK9fhjvQuoAr%2B6g7oWCq9p9zzIyBDP%2Bf8g1G54up2yup8fFdziUVBEbdctDS8W6MqhwPNFrsrFCVzORbTIdS6W31G2aB2okRu1nNDAGjwkm%2BB3QhAj8Yn9lVdGL7wLeEPF7CBmiJpvbRF0ImSCXtGyVZUuFm8isA8NW4k7%2B0T0Ysw%2BkpLFfRz5iGQCrKWZIetOGxSSjMMSsTaZb3ZE9IanqQf%2BRdayQQlion8mmnbo8Z5lA9%2BvILbSHt44I3RrHRtM1Ige0UUxcXWNNi0cG4efEqlBTfKQoDfGY1tPR6Q9I%2F0tfMrtVfXVguyFAu6WBH1cM240pVOkHBRJAFilSUTEatuGwXzWXfJJ9%2F7Cv8h%2BMKPpzIixFzHOPRAsfafo37xe%2BqQRT0v%2Bkw%2Ft7Ds",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "24",
              "Text": "Sammenhold (Id:13 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Sammenhold.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=J2aADLdIDG3HvBphBYlc2gbO%2Fq1cCILUSF9hnJ%2FyMp7CrdDMpQs3BjykRVdOJFjWVtF9HTNJBGb%2F0zIbMhsjaxY2ln4%2B8w0oWupwrnkBvLl0d3DLBBQBj9l7Fr5KGoTg2OlsUe6VlPpSVsBbz9qsKo9zS0xFISEYq69YIpB0cXw1cu6E%2FByXu8E18bZ2ZlOQKz1qAvV36ISNxwX4KP04VAkNDfdmJ8YLzErb3RLWrQmZThgE4ht5f1es2%2BGw0oq6kUv2q7tr0xD%2F9NUUWYXkUgpteUbUpbVJiX1PaY%2BH2bLZZpjNjvySqq7MF5D%2BwRTHibREinHNqjs38xkYWW32Mo1J590ZKdq7K3CPFhPp6wDriDxllkJZdaHWHya73v2jE4pPFmUief%2Fy6Xu3IEVdz9JSjcHt%2BEJPpTfcR7M%2F68NZr6HZjkVdw%2BuvnYct6OrB",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "25",
              "Text": "Snubleulykker (Id:14 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Snubleulykker.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=UbsqPgSLPh2yJZ6i5yB2YjMDtilVqauKYCfiqYCn%2FImWiTDAzgC6Rtqi1s6EHf%2BHS8zgYhqerVjX4%2FB11cWK6kD%2F%2BAXt2wMhIsXwa0idBeEXwIWdmU6jHZcVzJxkj6Mji1ypl0%2Fbh6LhasYPMtnhpVcJTwacZf3WAZxBYsQkeOYRqtA9qSztxxBhmYW7twYPqw4wGF%2F4cUrm4gEHEU7Vwn5PVepiq4E6qLhzDEujAMhCrqBJ5Y8SHTxKij8zB24gcP0A7OeT7YUP48AQFsdzp%2B5AwvMA2BHzk5ageWofJjW3R9oh5vuxF2cxBuIv%2BHPI1ucDgI1He3G0h3PIcfbtcEAkyv4NfHby6M1TTyEsmT5jiulX83l0yvXvaTOZxjdfupMpYOYpzDEDsN0e3yhxIfmJt4VmmaeNBnT8adLBdxPWRzFXS1MebeS3skvNa9Ix",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "1",
              "Text": "Tunge løft (Id:1 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Tunge loeft (1).mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=EpVYQO%2BRccqVo8xHplnZ0DzVodvGkzyX%2Bi0cIYnzuZYFkL5dea3vAt5sUwrakJx6FWQOc4HbvBdGugcX3lAboGVG1OKTbV2gb8zpeNRlicb33OXSJMlmWo6eLYWvra6u0W6hGjXkuEkcC4vGTzK6hTFzBJT9hwOd6wVawhSKAJvkCAsQI8M7YGcXxslzaZWL6ZTwMb4DuoyTISANpiWt6Me%2BFHRBNihWqC47QVNpJ7oJvufH4OdSuqH9wIMSLIn1kMZpbgdhRlOH0H4pSNvQgJX5uhYkCbZUadHUcwZqf6ZcLiCvJXXBwMO5zKAE7iIMf9P0XExsgxT%2BeV%2B8%2FzKSqMhcl1iJ69hYHlfJaHe0eDc0Fu1L0c3X97yhRN6PLpdAhmIkliI58U3rHye3vV4kxOLMCN1oDkoctOVXkRLbVbku9tWGB4EJJg%3D%3D",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "26",
              "Text": "Værnemidler (Id:15 v1.0)",
              "ExtendedInfo": "FILM - FYSISK ARBEJDSMILJØ > Fys AM - BFA film",
              "GroupName": "FILM - FYSISK ARBEJDSMILJØ",
              "GroupSortOrder": 1,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Vaernemidler.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=GzZnYWpFXyfPlWADy7AQXDR%2BoeYNTJpOPpbNEhXHjNHfT3zPP%2BhYlrRCZfNH0GwGEt62lzTk%2FcYW95F98AoSf0pyO9o%2BkgQWwAG8oAkzv2s1H7JenqPU3Kv1k%2BMeAI7bWM7hk%2FU%2F3u%2Bz52AXVpQ532wfdeJ7772ueU8Ce8Cq3Xzo0Ps4Oyvms6Ywuw%2Bn%2Bdi2%2FmK4TZdkgXVNqiWpPviCCXlJAcg4l1ma9KAL8ut%2BKE3pjzZsLbxuALh2z9LNcQqNCK%2BifpfocDG8wUVzn94mIZq3Ms6Xf1btwBwT8Ueg8w1%2B0TEpJos1qEV3BfNH%2Fv88HEkl%2BMyYIzUHSR4IQ9QSIGjPP1vGTpKKElt0E3GgavedeTk2Is4ScRifjFNTw78r2n5UrbvqT6%2BquGF9uW9drICLPrMT7iWqyKZtVQrx%2BEUGDHFNBDi%2BB3pgcFWCRw6x",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "23",
              "Text": "Kønskrænkende adfærd (Id:12 v1.0)",
              "ExtendedInfo": "FILM - PSYKISK ARBEJDSMILJØ > Psyk AM - BFA film",
              "GroupName": "FILM - PSYKISK ARBEJDSMILJØ",
              "GroupSortOrder": 2,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Koenskraenkende adfaerd.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=MzHEn2vXELSv1T3MNhQTwrQCEEGhoYir6%2FP7o9MenW2cUAlbdURAIUXvnujxe1lPf4S%2FDMS9i3cXVpLEX9SoAkvGBFBpGmWjtGc%2FWzAAvcyceCr9U%2FyZ6LPz%2Frg0JrsZeGKZM%2FEdIaxE5bgo4txupsw%2BzdOJICcpF10qTsaA%2FwT2ljGt1Or13EA6IatFLVf64658ER%2FMsSJwj3%2Bm7A2RlZw8sA19tof8qGc%2FIbYICGU%2BS4g%2FJZd%2BB1M1i4ZlM0ocSHp7lv2rAGkTgFEBaNV%2FqaxBCl7MCDHq%2BGZQNicsmK0UL8YOsTGJFiPr1LT4WWyj9k6TlhYiZVmxItGIY1XdAgN5ij1rYZWHLXzMRAKApwZHSVOfBYBsMpDPWUeLXBlz%2FjSMMMmMLK8B1rJ%2Fl81fQWNUkBdGFzJJojfCCcHBDAYkVVXjxUu0i6ewP84z3NlQ",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "27",
              "Text": "Trivsel og arbejdsglæde (Id:16 v1.0)",
              "ExtendedInfo": "FILM - PSYKISK ARBEJDSMILJØ > Psyk AM - BFA film",
              "GroupName": "FILM - PSYKISK ARBEJDSMILJØ",
              "GroupSortOrder": 2,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Trivsel og arbejdsglaede.mp4",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=GMyfUnB1%2B%2FHvc2NDvT2oBZWnVQvejO0Rl6PmmUz84I9iLzui4HHTFWXfk2gQbiZKzW0h8iOx0lAVsSxZxvKCdyQJ8eMUau4ixwd8RfjH1o%2Ff1pRiFL3eNbkMi%2Bwyj3YRZwrRUeZY30WCd9i%2FTwJq72gK2%2BAe9WLW7SshZHyD6TuvU31LtsUkNNR16ShwypuPDwYDGCp830rymDaI4JAU3CKDVt13eq7bTRAP%2B4IswUoB6fX3ba6Xeu0yTS%2BV7jxtV8lOk%2F90s0NwFvL%2BAi6RGHLH7DAfOHJynprkxqZtOB%2FrTWq%2BtGwFs2QBSGTCX3FidJFuyksb7gSKkQDuabb3UInLtoPBkfxinhmqeE1nkxbqgg8rNO33eMuIHYWiteVmQBadWFZw8Y%2FmjLgMerFDPl5CxnaCbOG60mIRwGWOdcNu%2BTlZopcuDkVnkNclgxW9",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "34",
              "Text": "Arbejdsulykker - hovedguide (Id:22 v1.0)",
              "ExtendedInfo": null,
              "GroupName": "VEJLEDNINGER M.M.",
              "GroupSortOrder": 80,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "Arbejdsulykker - hovedguide.pdf",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=8tLmIcJrLFHHZ363l98gmsKmMpOfdbtyfRphTlPRinuPYYw%2BWaVVLEyN1zggkSOw0jbVhWirY4QVR6r%2F0a8iTsrdyTMs1gdx%2BRJfCCjs6aQuvxWTzpjTQAq8NoC50ZcB%2BVIgQsNeB7nOYx6J2%2FBioDigSBKS3XZbXc7eDKh3KtiZnDJLthkLh%2F1yKX7%2BkjUsNdfRHu9%2B2CNmncrSXP4Q3vmsIiAN0Zid8LpRQWgvWMnB0ub4w8F9sRUsiEAdU4%2FKIYpjhQmrOZOtcovlzUx5xzE7f%2B6hIQzaEbjKLCLdUNoJ9Cdv2oJ%2FiRGmtUQwsI83ZTb5vdsgXG6Cphpf2kxwIEcFhgi0Gz4VKLIG%2FRZ%2FBgxLezCHF0V6VukA2bNT2TU3B%2BMjExZg3hKJjK4uNOSwydbcMsMc0HCrksMMUyHMYVTVZvvg4R4iPhSew%2F%2FJ5gVI",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "35",
              "Text": "At-vejledning A. 1.2-1 om indeklima (Id:23 v1.0)",
              "ExtendedInfo": null,
              "GroupName": "VEJLEDNINGER M.M.",
              "GroupSortOrder": 80,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "At-vejledning A. 1.2-1 om indeklima.pdf",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=p8X%2FPCzYXMPPJ0hCcMRs6P657GwMANQ0D106wraf15XiQ5tVeupi8wLSYSklpauzvGr7Bpal4XerQkmsTfOlWPoV%2Bxs2fs1AWT3fDE%2Fmfr9rEdb%2BEvXc5KrI%2Fvc6ooqcqy7tiVm4fFeVpq5kRoznb2M%2FjmCP2GPjP5LbriuSmqtGOeKH1Ky0FpHmATca%2FdW6WktwcBq1wZadCS9gyDq%2FDB1dxqtCKNSekFvIe2yNWgj%2Fh9VugqaJJDeru0inG65llol1Kw%2FD8QMYf3OPmRIO3DO%2FzMCALi8Q13LB0dIL1Q0MVPX%2BjQkyLGphj8Eg32TygA5uESSDpXgGz2GRYKn%2FF1MF07ykA%2F1TB1r6xVS3zbH5Tv1B7y5k%2FxrpMaCI0wu9eynNq9rsVlXylYyTNSIJN2NdzK%2BZg%2F0d4cXf8nhTJw8R1mmjIl3buvDWeMAw3FID",
              "FileName": null,
              "FileSourceBase64": null
            },
            {
              "Id": "36",
              "Text": "At-vejledning D. 6.1-5 om støj (Id:24 v1.0)",
              "ExtendedInfo": null,
              "GroupName": "VEJLEDNINGER M.M.",
              "GroupSortOrder": 80,
              "DocumentTypeCode": "Link",
              "HtmlContent": null,
              "LinkName": "At-vejledning D. 6.1-5 om stoej.pdf",
              "Link": "https://test.safetynet.dk/FAD_SIT/DocumentLibrary/WebDocumentView.aspx?t=KQiYft6UmR%2BIYxMek7Lp21EXPWHPu6Fc8YfL%2F%2BOYvZ6NeTQZjwdx%2BKGEkVJdvUNMhOzUOeN0iPtGthFf6ssh36udbdk8qeUN%2F9ZgBi5QTTDeOLAApdV%2FUgwp2noObXpz%2FPUV%2BQb4B8jeG2FewHb6zmC8VqktBhFpYYLGelyhcX5Wds3RwM43WLwaI2Q2j6THiGu5X%2B2W4fwxmAVYOM6rnOZP5bO7TR5ivm61yRFe%2BOMs1kYGvm3MAm%2BUKKtFycwkUHEW2CTwTMnoB6SajXWVX8RObYrHYhLmg9thuPszxI3Jgw9BthDviqP6RbefwuK0p6fr2PInI0R56x%2FCNhZPE25cSYjdbFJtbZLSHME5D%2BMbfa2KEd%2FRu03g0wdurmoAZeBFt0budfY4wYYNp8vLN%2BkSS8yq6b0NdtdzGvk%2FABboRa62B6wFam%2FxyCM%2FV5vZ",
              "FileName": null,
              "FileSourceBase64": null
            }
          ];
        function getFileExtension(fileName) {
            return fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
        }
        function downloadFile(index) {
            return new Promise((resolve, reject) => {
                const uriString = downloadList[index].Link;
                const fileExt = "." + getFileExtension(downloadList[index].LinkName);
                
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                    var testFileName = "Sample_" + index + "_" + Date.now() + fileExt;
                    fileSystem.root.getFile(testFileName, { create: true }, function (newFile) {
                        var lblProgress = document.getElementById('lblProgress');
                        var complete = function () {
                            lblProgress.innerHTML = 'Done';
                            resolve();
                        };
                        var error = function (err) {
                            console.log('Error: ' + err);
                            lblProgress.innerHTML = 'Error: ' + err;
                            reject(err);
                        };
                        var progress = function (progress) {
                            lblProgress.innerHTML = (100 * progress.bytesReceived / progress.totalBytesToReceive) + '%';
                        };

                        try {
                            var downloader = new BackgroundTransfer.BackgroundDownloader();
                            var download = downloader.createDownload(uriString, newFile);
                            app.downloadPromise = download.startAsync().then(complete, error, progress);
                        } catch (err) {
                            console.log('Error: ' + err);
                            reject(err);
                        }
                    }, function (err) {
                        console.log('File system error: ' + err);
                        reject(err);
                    });
                });
            });
        }

        async function downloadAllFiles() {
            for (let index = 0; index < downloadList.length; index++) {
                try {
                    await downloadFile(index);
                } catch (err) {
                    console.error('Error downloading file:', err);
                }
            }
        }
            
    },
    stopDownload: function () {
        app.downloadPromise && app.downloadPromise.cancel();
    },
    
    getFileInfo: function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(app.fileName, { create: true }, function (fileEntry) {
                fileEntry.file(function (meta) {
                    document.getElementById('lblFileInfo').innerHTML =
                        "Modified: " + meta.lastModifiedDate + "<br/>" +
                        "size: " + meta.size;
                });
            }, function(error) {
                document.getElementById('lblFileInfo').innerHTML = "error: " + error;
            });
        });
    },

        // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
