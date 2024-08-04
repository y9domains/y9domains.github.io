# Protobuf

Protobuf 是目前非常主流的二进制序列化格式，GRPC 默认使用 Protobuf v3 格式

在protobuf3 中，去掉了required 和 optional 修饰符，所有字符都是optional 的，对于原始数据类型，不存在hasXXX() 方法，如何判断参数指是0 还是因为设置参数填充的默认值，会产生歧义

### 用特殊值区分，尽量避免null
大多数情况下，没设置和设置默认值有相同的业务含义，比如没收入和收入0元是相同的，如果一定要区分，比如收益率，可以考虑用特殊值区分，例如-1.0, Double.MAX_VALUE 等，这和函数返回值既表示错误也表示正常返回值的做法类似：open() 函数返回 -1 表示失败，否则表示成功。

另一个策略是把紧密相关的字段打包成消息类型，由于不再是原始数据类型，比如 profit_rate_with_date，就可以用 hasXxx() 判断了。

### 显式定义

```
message Account {
	string name = 1;
	double profit_rate = 2;
    bool  has_profit_rate = 3;
}
```

每次设置 profit_rate 之后，要记得也设置 has_profit_rate 字段

### 使用oneof

```
message Account {
	string name = 1;
	oneof profit_rate {		# 可以加个 _present 后缀什么的
		double profit_rate = 2;
	}
}
```

- 在 Java 中，依然对于原始数据类型没有 hasXxx()，需要用 XxxCase() == XxxCase.XXX_NOT_SET 或者 XxxCase().getNumber == 0 判断是否设置了。

### 使用wrapper类型

```
import &#34;google/protobuf/wrappers.proto&#34;;

message Account {
	string name = 1;
	google.protobuf.DoubleValue profit_rate = 2;
}
```

这跟编程语言中的 primitive type 和 boxed primitive type 之分是一致的，前者没有 null 一说。采用 wrapper 类型后，就可以用 hasXxx() 判断是否设置过了。

在 Java 中，使用 setProfitRate(DoubleValue.of(1.0)) 设置，使用 getProfitRate().getValue() 获取

---

> 作者: y9domains  
> URL: https://www.y9.network/posts/protobuf/  

