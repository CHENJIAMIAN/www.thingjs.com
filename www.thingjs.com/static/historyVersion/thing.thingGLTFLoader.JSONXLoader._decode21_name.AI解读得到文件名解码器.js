// 从字符串中删除特定位置的字符
String.prototype._removeAt = function(index, count = 1) {
    return index >= this.length ? this : this.slice(0, index) + this.slice(index + count);
}

// 检查字符串是否以特定子字符串开头
String.prototype._startsWith = function(substring) {
    return this.slice(0, substring.length) === substring;
}

// 获取字符串的路径部分（假设字符串为文件路径）
String.prototype._getPath = function() {
    var lastBackslashIndex = this.lastIndexOf("\\");
    var lastSlashIndex = this.lastIndexOf("/");
    var lastIndex = lastBackslashIndex > lastSlashIndex ? lastBackslashIndex : lastSlashIndex;
    return this.substring(0, lastIndex);
}

// 获取字符串的扩展部分（假设字符串为文件名）
String.prototype._getExtension = function() {
    var parts = this.split(".");
    if (parts.length > 1) {
        var extension = parts.pop();
        var queryIndex = extension.indexOf("?");
        return queryIndex !== -1 ? extension.substring(0, queryIndex) : extension;
    }
    return "";
}

// 获取字符串的文件名部分（假设字符串为文件路径）
String.prototype._getFileName = function(includeExtension = true) {
    var lastSeparatorIndex = this.indexOf("\\") >= 0 ? this.lastIndexOf("\\") : this.lastIndexOf("/");
    if (lastSeparatorIndex === -1) {
        return includeExtension ? this : this.split(".")[0];
    }
    var fileName = this.substring(lastSeparatorIndex);
    if (fileName.startsWith("\\") || fileName.startsWith("/")) {
        fileName = fileName.substring(1);
    }
    return includeExtension ? fileName : fileName.split(".")[0];
}

// 修剪字符串左侧的字符
String.prototype._trimLeft = function(characters = "s") {
    var regex = new RegExp("^[" + characters + "]+");
    return this.replace(regex, "");
}

// 修剪字符串右侧的字符
String.prototype._trimRight = function(characters = "s") {
    var regex = new RegExp("[" + characters + "]+$");
    return this.replace(regex, "");
}

// 修剪字符串两边的字符
String.prototype._trimBoth = function(characters) {
    return this.trimLeft(characters).trimRight(characters);
}

// 向字符串附加路径（假设字符串是文件路径）
String.prototype._appendPath = function(path) {
    return this.trimRight("/") + "/" + path.trimLeft("/").trimRight("/");
}

// 将 URL 附加到字符串（假设字符串是 URL）
String.prototype._appendURL = function(url) {
    var fileName = this.getFileName();
    return fileName.startsWith("?") ? this.getPath().appendPath(url) + fileName : this.appendPath(url);
}


// shift是buffer和image的uri数量和
function decodeFileName(encodedFileName, shift) {
    // 定义字符映射表
    const charMap = ["F7WD3HNR2OPYV6AUS5TKM018ZBJL4EQXIGC9F", "A0JQM9PSLXF18647URV3DNHOCY52TEZBWIGKA", "B0IE6Q4S3C7OA28UHTPXDW9NYMGLF1K5VJRZB", "EQ72MKL3DYNF5RU1PWBT64X9CIZVJHS8G0OAE"];

    // 获取编码文件名的第一个字符
    var firstChar = encodedFileName.charAt(0);

    // Find the position of the first character in the second string of the character mapping table
    var position = charMap[1].indexOf(firstChar);

    if (position !== -1) {
        // 更新位置并从编码后的文件名中删除该位置的字符
        position++;
        position = Math.floor(position / 2) + 1;
        encodedFileName = encodedFileName._removeAt(position);

        // 获取编码文件名的扩展名
        var extension = encodedFileName._getExtension();

        // 获取编码文件名的文件名部分（不带扩展名）
        encodedFileName = encodedFileName._getFileName(false);

        // 初始化解码后的文件名
        var decodedFileName = "";

        // 解码编码文件名的每个字符
        for (var i = 0; i < encodedFileName.length; i++) {
            var char = encodedFileName[i];

            // 根据当前字符的位置和移位从字符映射表中选择一个字符串
            var mapString = charMap[(i + 1 + shift) % 4];

            // 查找字符在所选字符串中的位置
            var charPosition = mapString.indexOf(char);

            // 更新字符位置，将字符映射表中的对应字符添加到解码后的文件名中
            charPosition === 0 ? charPosition = 35 : charPosition--;
            decodedFileName += mapString[charPosition];
        }

        // 如果编码后的文件名有扩展名，则将其添加到解码后的文件名中
        if (extension) {
            return decodedFileName + "." + extension;
        }

        // 返回解码后的文件名
        return decodedFileName;
    }
}

[decodeFileName('7D04APIPOD6UCZ675Z2KTJ61TTJKCUNQE',3),
decodeFileName('AD87C9PVT92QC1N05J0QCQDVX17U2FJQP',3),
decodeFileName('J6D0OUY748W2GTU82AWQ43DOO3NUCAN0T',3),]

// 即使路径破解正确出来, 模型还是乱的, 看起来是顶点顺序不对,下一步研究一下优锘做了什么