
export class DataFormat{
    constructor(
        public label: String,
        public placeholder?: String,
        public model?: String,
        public errorMsg?: String
    ) {}
}

export class FormData {
    constructor(
        public firstName: DataFormat,
        public lastName: DataFormat,
        public submit: DataFormat,
        public dateOfBirth: DataFormat,
        public title: String,
    ) {}

}