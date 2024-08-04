# Java程序常用命令

# java 常用命令

## jstat
查看堆内存各部分的使用量，以及加载类的数量
### 官方文档
```shell 
Usage: jstat -help|-options
       jstat -&lt;option&gt; [-t] [-h&lt;lines&gt;] &lt;vmid&gt; [&lt;interval&gt; [&lt;count&gt;]]

Definitions:
  &lt;option&gt;      An option reported by the -options option
  &lt;vmid&gt;        Virtual Machine Identifier. A vmid takes the following form:
                     &lt;lvmid&gt;[@&lt;hostname&gt;[:&lt;port&gt;]]
                Where &lt;lvmid&gt; is the local vm identifier for the target
                Java virtual machine, typically a process id; &lt;hostname&gt; is
                the name of the host running the target Java virtual machine;
                and &lt;port&gt; is the port number for the rmiregistry on the
                target host. See the jvmstat documentation for a more complete
                description of the Virtual Machine Identifier.
  &lt;lines&gt;       Number of samples between header lines.
  &lt;interval&gt;    Sampling interval. The following forms are allowed:
                    &lt;n&gt;[&#34;ms&#34;|&#34;s&#34;]
                Where &lt;n&gt; is an integer and the suffix specifies the units as
                milliseconds(&#34;ms&#34;) or seconds(&#34;s&#34;). The default units are &#34;ms&#34;.
  &lt;count&gt;       Number of samples to take before terminating.
  -J&lt;flag&gt;      Pass &lt;flag&gt; directly to the runtime system.
```
- option： 参数选项
- -t： 可以在打印的列加上Timestamp列，用于显示系统运行的时间
- -h： 可以在周期性数据数据的时候，可以在指定输出多少行以后输出一次表头
- vmid： Virtual Machine ID（ 进程的 pid）
- interval： 执行每次的间隔时间，单位为毫秒
- count： 用于指定输出多少次记录，缺省则会一直打印


### 常用命令
- 统计单位为KB
1. 类加载统计
jstat -class pid

- Loaded : 已经装载的类的数量
- Bytes : 装载类所占用的字节数
- Unloaded：已经卸载类的数量
- Bytes：卸载类的字节数
- Time：装载和卸载类所花费的时间

1. 编译统计
jstat -compiler pid

- Compiled：编译任务执行数量
- Failed：编译任务执行失败数量
- Invalid ：编译任务执行失效数量
- Time ：编译任务消耗时间
- FailedType：最后一个编译失败任务的类型
- FailedMethod：最后一个编译失败任务所在的类及方法

1. 垃圾回收统计
jstat -gc pid

S0C：年轻代中第一个survivor（幸存区）的容量
S1C：年轻代中第二个survivor（幸存区）的容量
S0U：年轻代中第一个survivor（幸存区）目前已使用空间
S1U：年轻代中第二个survivor（幸存区）目前已使用空间
EC：年轻代中Eden（伊甸园）的容量
EU：年轻代中Eden（伊甸园）目前已使用空间
OC：老年代的容量
OU：老年代目前已使用空间
MC：方法区大小
MU：方法区使用大小
CCSC:压缩类metaspace空间大小
CCSU:压缩类空间使用大小
YGC：年轻代垃圾回收次数
YGCT：年轻代垃圾回收消耗时间
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间

1. 堆内存统计
jstat -gccapacity pid

NGCMN：新生代最小容量
NGCMX：新生代最大容量
NGC：当前新生代容量
S0C：第一个幸存区大小
S1C：第二个幸存区的大小
EC：伊甸园区的大小
OGCMN：老年代最小容量
OGCMX：老年代最大容量
OGC：当前老年代大小
OC:当前老年代大小
MCMN:最小元数据容量
MCMX：最大元数据容量
MC：当前元数据空间大小
CCSMN：最小压缩类空间大小
CCSMX：最大压缩类空间大小
CCSC：当前压缩类空间大小
YGC：年轻代gc次数
FGC：老年代GC次数

2. 新声代垃圾回收统计
jstat -gcnew pid

S0C：第一个幸存区大小
S1C：第二个幸存区的大小
S0U：第一个幸存区的使用大小
S1U：第二个幸存区的使用大小
TT:对象在新生代存活的次数
MTT:对象在新生代存活的最大次数
DSS:期望的幸存区大小
EC：伊甸园区的大小
EU：伊甸园区的使用大小
YGC：年轻代垃圾回收次数
YGCT：年轻代垃圾回收消耗时间

3. 新生代内存统计
jstat -gcnewcapacity pid

NGCMN：新生代最小容量
NGCMX：新生代最大容量
NGC：当前新生代容量
S0CMX：最大幸存1区大小
S0C：当前幸存1区大小
S1CMX：最大幸存2区大小
S1C：当前幸存2区大小
ECMX：最大伊甸园区大小
EC：当前伊甸园区大小
YGC：年轻代垃圾回收次数
FGC：老年代回收次数

4. 老年代垃圾回收统计
jstat -gcold pid

MC：方法区大小
MU：方法区使用大小
CCSC:压缩类空间大小
CCSU:压缩类空间使用大小
OC：老年代大小
OU：老年代使用大小
YGC：年轻代垃圾回收次数
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间

5. 老年代内存统计
jstat -gcoldcapacity pid

OGCMN：老年代最小容量
OGCMX：老年代最大容量
OGC：当前老年代大小
OC：老年代大小
YGC：年轻代垃圾回收次数
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间

6. 总结垃圾回收统计
jstat -gcutil pid

S0：幸存1区当前使用比例
S1：幸存2区当前使用比例
E：伊甸园区使用比例
O：老年代使用比例
M：元数据区使用比例
CCS：压缩使用比例
YGC：年轻代垃圾回收次数
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间

7. jvm编译方法统计
jstat -printcompilation pid

Compiled：最近编译方法的数量
Size：最近编译方法的字节码数量
Type：最近编译方法的编译类型。
Method：方法名标识。

## jps

### 官方手册
```shell
usage: jps [-help]
       jps [-q] [-mlvV] [&lt;hostid&gt;]

Definitions:
    &lt;hostid&gt;:      &lt;hostname&gt;[:&lt;port&gt;]
```
### 常用方法
- jps
23991 Jps
23651 Resin
显示pid与对应的程序
- jps -q
28680
23789
只显示pid，不显示jar文件名，class名称和传递给main的参数
- jps -m
28715 Jps -m
23789 BossMain
输出传递给main的参数
- jps -l 
28729 sun.tools.jps.Jps
23789 com.asiainfo.aimc.bossbi.BossMain
输出应用程序main class的完整package名或者应用程序的jar文件完整路径名
- jps -v
输出传递给JVM的参数
- jps -V
隐藏输出传递给JVM的参数

## jinfo

### 官方手册
```shell
Usage:
    jinfo [option] &lt;pid&gt;
        (to connect to running process)
    jinfo [option] &lt;executable &lt;core&gt;
        (to connect to a core file)
    jinfo [option] [server_id@]&lt;remote server IP or hostname&gt;
        (to connect to remote debug server)

where &lt;option&gt; is one of:
    -flag &lt;name&gt;         to print the value of the named VM flag
    -flag [&#43;|-]&lt;name&gt;    to enable or disable the named VM flag
    -flag &lt;name&gt;=&lt;value&gt; to set the named VM flag to the given value
    -flags               to print VM flags
    -sysprops            to print Java system properties
    &lt;no option&gt;          to print both of the above
    -h | -help           to print this help message
```


## jmap

### 官方手册
```shell
Usage: 
    jmap [option] &lt;pid&gt;
        (to connect to running process)
    jmap [option] &lt;executable &lt;core&gt;
        (to connect to a core file)
    jmap [option] [server_id@]&lt;remote server IP or hostname&gt;
        (to connect to remote debug server)

where &lt;option&gt; is one of:
    &lt;none&gt;               to print same info as Solaris pmap
    -heap                to print java heap summary
    -histo[:live]        to print histogram of java object heap; if the &#34;live&#34;
                         suboption is specified, only count live objects
    -clstats             to print class loader statistics
    -finalizerinfo       to print information on objects awaiting finalization
    -dump:&lt;dump-options&gt; to dump java heap in hprof binary format
                         dump-options:
                           live         dump only live objects; if not specified,
                                        all objects in the heap are dumped.
                           format=b     binary format
                           file=&lt;file&gt;  dump heap to &lt;file&gt;
                         Example: jmap -dump:live,format=b,file=heap.bin &lt;pid&gt;
    -F                   force. Use with -dump:&lt;dump-options&gt; &lt;pid&gt; or -histo
                         to force a heap dump or histogram when &lt;pid&gt; does not
                         respond. The &#34;live&#34; suboption is not supported
                         in this mode.
    -h | -help           to print this help message
    -J&lt;flag&gt;             to pass &lt;flag&gt; directly to the runtime system
```
### 常用命令


## jstack

### 官方手册
```shell
Usage:
    jstack [-l] &lt;pid&gt;
        (to connect to running process)
    jstack -F [-m] [-l] &lt;pid&gt;
        (to connect to a hung process)
    jstack [-m] [-l] &lt;executable&gt; &lt;core&gt;
        (to connect to a core file)
    jstack [-m] [-l] [server_id@]&lt;remote server IP or hostname&gt;
        (to connect to a remote debug server)

Options:
    -F  to force a thread dump. Use when jstack &lt;pid&gt; does not respond (process is hung)
    -m  to print both java and native frames (mixed mode)
    -l  long listing. Prints additional information about locks
    -h or -help to print this help message
```

### 常用命令


---

> 作者: y9domains  
> URL: https://www.y9.network/posts/java%E7%A8%8B%E5%BA%8F%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4/  

