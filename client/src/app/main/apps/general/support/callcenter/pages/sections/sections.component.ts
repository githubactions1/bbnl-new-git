import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'app/main/apps/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import FroalaEditor from 'froala-editor';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-crm-section',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.scss']
})
export class SectionComponent implements OnInit {
    froalForm: FormGroup;
    sections: any = [];
    content: any = {};
    showData: boolean = false;
    newContent: boolean = false;
    edtContent: boolean = false;
    currentIndex = 0;
    page: any = [];
    selectedItem = 0;
    events: string[] = [];
    opened = true;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(public formBuilder: FormBuilder, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private crdSrv: CrudService, private router: Router,
        private route: ActivatedRoute,
    ) {
        // console.log(this.router.url);
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    flrOptns() {

        return {
            charCounterCount: true,
            toolbarInline: true,
            imageUploadParams: {
                id: 123
            },
            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
            events: {
                'image.replaced': function ($img, response) {
                    console.log($img)
                  // Image was replaced in the editor.
                },

                'image.beforeUpload': function (files) {
                    const editor = this;
                    if (files.length) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            let result: any = e.target['result'];
                            var data = new FormData();
                            data.append('imgData', result);
                            var xhr = new XMLHttpRequest();
                            xhr.open('POST', 'http://localhost:4901/apiv1/kb/froalaImgUpld', true);
                            xhr.onload = function () {
                                let res = JSON.parse(this.responseText);
                                editor.image.insert(res.link, null, null, editor.image.get());
                            };
                            xhr.send(data);
                        };
                        reader.readAsDataURL(files[0]);
                    }
                    return false;
                }

            }
        }
    }
    ngOnInit() {
        console.log("sectionnnnnnnnnnnnnnnn")
        this.route.params.subscribe(params => {
            console.log(params);
            this.getPageDtls();
            this.selectedItem = 0;
        })
        // this.froalForm = this.formBuilder.group({
            // 'dscptn_txt': [this.content.dscptn_txt != undefined ? this.content.dscptn_txt : ''],
            // 'sctn_nm': [this.content.sctn_nm]
        // });
        this.content['froalaOptns'] = this.flrOptns();
    }
    sctnSlctd(a, idx) {
        this.content = a;
        this.newContent = false;
        this.edtContent = false;
        this.currentIndex = idx;
    }
    addSctn() {
        this.content = {
            pge_id: this.page.pge_id
        };
        this.edtContent = false;
        this.newContent = true;
    }
    cancel() {
        this.content = {
            pge_id: this.page.pge_id
        };
        this.newContent = false;
        this.edtContent = false;
        this.sctnSlctd(this.sections[this.currentIndex], this.currentIndex);
    }
    editContent(content) {
        this.content = content;
        this.edtContent = true;
    }
    saveSctn() {
        console.log(this.content);
        let url = 'kb/section';
        // this.crdSrv.create(this.content, url).subscribe(res => {
        //     console.log(res);
        //     // this.sections = res['data'];
        //     if (res['status'] == 200)
        //         this.getSections();
        //     // this.showData = true;
        // })
    }
    updtSctn() {
        console.log(this.content);
        let url = 'kb/section'
        this.crdSrv.update(this.content, url).subscribe(res => {
            console.log(res);
            // this.sections = res['data'];
            if (res['status'] == 200)
                this.getSections();
            // this.showData = true;
        })
    }
    getPageDtls() {
        let url = 'kb/page'
        this.crdSrv.create({ url: this.router.url }, url).subscribe(res => {
            // console.log(res)
            if (res['status'] == 200)

                if (res['data'] && res['data'].length) {
                    this.page = res['data'][0];
                    this.getSections();
                }

        })
    }
    getSections() {
        let url = 'kb/sections/' + this.page.pge_id
        this.crdSrv.get(url).subscribe(res => {
            // console.log(res);
            if (res['status'] == 200)

                if (res['data'] && res['data'].length) {
                    this.sections = res['data'];
                    this.sctnSlctd(this.sections[this.currentIndex], this.currentIndex);
                    this.showData = true;
                }
        })
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}