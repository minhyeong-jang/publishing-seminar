Minhyeong-jang / doriri.biz
===========================

> 해당 블로그는 [jekyll](https://jekyllrb.com/)를 사용하였습니다.

### 설치

1. ruby 설치
2. jekyll 설치
3. git fetch or pull or clone

### Ruby 설치

```console
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install ruby
$ gem install jekyll
```

### Git Clone

```console
$ git clone https://github.com/minhyeong-jang/doriri.git
$ cd doriri
$ bundle install
```

### 실행

```
$ bundle exec jekyll serve
$ open http://localhost:4000
```

### 배포(발행)

```
$ git commit -m '...'
$ git push origin master
```
### 파일 형식
글 : `{year}-{month}-{day}-{title}.md // 2018-07-01-wordpress.md`<br/>
이미지 : `{title}-{num} // wordpree-1.png`<br/>

### 블로그 마크업
대메뉴 : `h1`<br/>
대메뉴 설명 : `h2`<br/>
중메뉴 : `h3`<br/>
소메뉴 : `h4`<br/>
이미지 : `![wordpress.com](/files/wordpress-info-1.png)`<br/>
이미지 설명 : `<img-info></img-info>`<br/>
글 개행 : `<br/>`<br/>
강조 : ` `` `<br/>
코드 : ` ``` code ``` `

## License

This software is licensed under the [Apache 2 license](LICENSE.txt), quoted below.

Copyright 2018 Minhyeong Jang

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.