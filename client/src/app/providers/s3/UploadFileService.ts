import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, Subject, BehaviorSubject, Subscription, } from 'rxjs';

@Injectable()
export class UploadFileService {
    private file_prgrs: BehaviorSubject<any>;

    constructor() {
        this.file_prgrs = new BehaviorSubject({
            ttl_file_size: 0,
            file_nm: '',
            up_stream_bytes: 0
        });
    }

    setFilePrgrs = (prgrs) => {
        this.file_prgrs.next(prgrs);
    }

    getFilePrgrs = (): Observable<any> => {
        return this.file_prgrs.asObservable();
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    uploadFile(file, clabk) {
        console.log(file)
        const contentType = file.type;
        const bucket = new S3({
            accessKeyId: 'AKIAIXPSZWJOOTEL4DRQ',
            secretAccessKey: '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',
            region: 'ap-southeast-1'
        });
        var name = 'apfibernet_image' + Date.now();
        console.log(name)
        var imgNm = name + ".jpg";

        const params = {
            Bucket: 'dswetrack/apfibernet',
            Key: imgNm,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };

        //for upload progress   
        bucket.upload(params).on('httpUploadProgress', (evt) => {
            // console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
            this.setFilePrgrs({
                ttl_file_size: this.formatBytes(evt.total),
                file_nm: '',
                up_stream_bytes: this.formatBytes(evt.loaded)
            })
        }).send((err, data) => {
            if (err) {
                // console.log('There was an error uploading your file: ', err);
                clabk(err, 'There was an error uploading your file.')
                return false;
            }
            // console.log('Successfully uploaded file.', data);
            clabk(false, data)
            return true;
        });

    }




}
