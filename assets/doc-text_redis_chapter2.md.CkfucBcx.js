import{_ as s,c as i,a2 as a,o}from"./chunks/framework.3VuPyQdv.js";const r="/docs-demo/redisImages/image-20250412134834950.png",p="/docs-demo/redisImages/image-20250412135541703.png",d="/docs-demo/redisImages/image-20250412135626311.png",m="/docs-demo/redisImages/image-20250412135716317.png",t="/docs-demo/redisImages/image-20250412135904456.png",g="/docs-demo/redisImages/image-20250412140300483.png",l="/docs-demo/redisImages/image-20250412140334001.png",c="/docs-demo/redisImages/image-20250412140539111.png",n="/docs-demo/redisImages/image-20250412143040215.png",h="/docs-demo/redisImages/image-20250412143204897.png",_="/docs-demo/redisImages/image-20250412143515348.png",b="/docs-demo/redisImages/image-20250412143957147.png",u="/docs-demo/redisImages/image-20250412144015323.png",f="/docs-demo/redisImages/image-20250412144353554.png",I="/docs-demo/redisImages/image-20250412144525191.png",q="/docs-demo/redisImages/image-20250412145620989.png",k="/docs-demo/redisImages/image-20250412160029456.png",x="/docs-demo/redisImages/image-20250412160456020.png",R="/docs-demo/redisImages/image-20250412160045041.png",v="/docs-demo/redisImages/image-20250412160715667.png",P="/docs-demo/redisImages/image-20250412160833207.png",B="/docs-demo/redisImages/image-20250412162222408.png",D="/docs-demo/redisImages/image-20250412162355639.png",O="/docs-demo/redisImages/image-20250412163907395.png",y="/docs-demo/redisImages/image-20250412163947557.png",S="/docs-demo/redisImages/image-20250412164019685.png",A="/docs-demo/redisImages/image-20250412164706643.png",F="/docs-demo/redisImages/image-20250412165053214.png",N="/docs-demo/redisImages/image-20250412170306543.png",$="/docs-demo/redisImages/image-20250412170338012.png",w="/docs-demo/redisImages/image-20250412170442335.png",C="/docs-demo/redisImages/image-20250412170506875.png",L="/docs-demo/redisImages/image-20250412170541034.png",j=JSON.parse('{"title":"redis","description":"","frontmatter":{},"headers":[],"relativePath":"doc-text/redis/chapter2.md","filePath":"doc-text/redis/chapter2.md","lastUpdated":1744449979000}'),T={name:"doc-text/redis/chapter2.md"};function U(E,e,G,H,J,V){return o(),i("div",null,e[0]||(e[0]=[a('<h1 id="redis" tabindex="-1">redis <a class="header-anchor" href="#redis" aria-label="Permalink to &quot;redis&quot;">​</a></h1><h2 id="redis数据数据持久化" tabindex="-1">redis数据数据持久化 <a class="header-anchor" href="#redis数据数据持久化" aria-label="Permalink to &quot;redis数据数据持久化&quot;">​</a></h2><p><img src="'+r+'" alt="image-20250412134834950"></p><p>为什么要用数据持久化？</p><p>数据持久化可以在内存丢失或其他灾难性故障的情况下实现恢复。</p><p>数据持久化的两种方式</p><ol><li>AOF：以日志的形式来记录每个写操作，将redis执行过的所有写指令记录下来（读操作不记录），只许追加文件但不可以改写文件，redis启动之初会读取该文件重新构建数据，换言之，redis重启的话就根据日志文件的内容将写入指令从前到后执行一次以完成数据的恢复工作。</li><li>RDB（Redis 数据库）：RDB 持久性以指定的时间间隔执行数据集的时间点快照。</li></ol><h3 id="rdb-redis-database" tabindex="-1">rdb（redis database） <a class="header-anchor" href="#rdb-redis-database" aria-label="Permalink to &quot;rdb（redis database）&quot;">​</a></h3><p><strong>能干嘛？</strong></p><p>在指定的时间间隔内将内存中的数据集快照写入磁盘，也就是行话讲的Snapshot内存快照，它恢复时再将硬盘快照文件直接读回到内存里。Redis的数据都在内存中，保存备份时它执行的是全量快照，也就是说，把内存中的所有数据都记录到磁盘中，一锅端。</p><p>Rdb保存的是dump.rdb文件</p><p><img src="'+p+'" alt="image-20250412135541703"></p><p>Redis6.0.16以下</p><p><img src="'+d+'" alt="image-20250412135626311"></p><p>Redis6.2以及Redis-7.0.0</p><p><img src="'+m+'" alt="image-20250412135716317"></p><h4 id="自动触发" tabindex="-1">自动触发 <a class="header-anchor" href="#自动触发" aria-label="Permalink to &quot;自动触发&quot;">​</a></h4><ol><li>redis7版本，按照redis.conf里配置的save&lt;seconds&gt;&lt;changes&gt;</li></ol><p><img src="'+t+'" alt="image-20250412135904456"></p><ol start="2"><li>本案例5秒内2次修改</li></ol><p><img src="'+g+'" alt="image-20250412140300483"></p><ol start="3"><li>修改dump文件保存路径</li></ol><p><img src="'+l+'" alt="image-20250412140334001"></p><p><img src="'+c+'" alt="image-20250412140539111"></p><p><img src="'+n+'" alt="image-20250412143040215"></p><p><img src="'+h+'" alt="image-20250412143204897"></p><p>修改dump的默认文件名称</p><p><img src="'+_+'" alt="image-20250412143515348"></p><p>触发备份情况</p><ol><li><img src="'+b+'" alt="image-20250412143957147"></li><li><img src="'+u+'" alt="image-20250412144015323"></li></ol><p>如何恢复？</p><ol><li><p>将备份文件（dump6379.rdb）移动到redis安装目录并启动服务即可</p></li><li><p>备份成功后故意用flushdb清空redis，看看是否可以恢复数据</p><p><img src="'+f+'" alt="image-20250412144353554"></p><ol><li><p>结论</p><p>执行flushdb/flushall命令也会产生dump.rdb文件，但是里面是空的，无意义</p></li></ol></li><li><p>物理恢复，一定服务和备份<strong>分级隔离</strong></p><p><img src="'+I+'" alt="image-20250412144525191">不可以把备份文件dump.rdb和生产redis服务器放在同一台机器，必须分开各自存储，以防生产机物理损坏后备份文件也挂了。</p></li></ol><p>注意：</p><p><img src="'+q+'" alt="image-20250412145620989"></p><p>执行quit命令就会写入dump文件，建议保存好数据，修改文件名或后缀名，或者备份文件，以免文件被覆盖</p><h4 id="手动触发" tabindex="-1">手动触发 <a class="header-anchor" href="#手动触发" aria-label="Permalink to &quot;手动触发&quot;">​</a></h4><p>redis提供了两个命令来生成RDB文件，分别是save和bgsave</p><p><strong>save（不推荐使用）</strong>：</p><p>在主程序中执行<strong>会阻塞</strong>当前redis服务器，直到持久化工作完成执行save命令期间，redis不能处理其他命令，线上禁止使用。</p><p><img src="'+k+'" alt="image-20250412160029456"></p><p><img src="'+x+'" alt="image-20250412160456020"></p><p><strong>bgsave（默认）</strong>：</p><p>redis会在后台异步进行快照操作，<strong>不阻塞</strong>快照同时还可以响应客户端请求，该触发方式会fork一个子进程由子进程复制持久化过程</p><p>redis会使用bgsave对当前内存中的所有数据做快照，这个操作是子进程在后台完成的，这就允许主进程同时可以修改数据。</p><p><strong>fork是什么？</strong></p><p>在Linux程序中，fork()会产生一个和父进程完全相同的子进程，但子进程在此后多会exec系统调用，出于效率考虑，尽量避免膨胀。</p><p><img src="'+R+'" alt="image-20250412160045041"></p><p><img src="'+v+'" alt="image-20250412160715667"></p><p><strong>lastsave</strong>：可以通过lastsave命令获取最后一次成功执行快照的时间</p><p><img src="'+P+'" alt="image-20250412160833207"></p><h3 id="优势" tabindex="-1">优势 <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势&quot;">​</a></h3><p><img src="'+B+'" alt="image-20250412162222408"></p><ol><li>适合大规模的数据恢复</li><li>按照业务定时备份</li><li>对数据完整性和一致性要求不高</li><li>RDB文件在内存中的加载速度要比 AOF 快得多</li></ol><h3 id="劣势" tabindex="-1">劣势 <a class="header-anchor" href="#劣势" aria-label="Permalink to &quot;劣势&quot;">​</a></h3><p><img src="'+D+'" alt="image-20250412162355639"></p><ol><li>在一定间隔时间做一次备份，所以如果redis意外down掉的话，就会丢失从当前至最近一次快照期间的数据，快照之间的数据会丢失</li><li>内存数据的全量同步，如果数据量太大会导致 I/O 严重影响服务器性能</li><li>RDB 依赖于主进程的 fork，在更大的数据集中，这可能会导致服务请求的瞬间延迟。fork的时候内存中的数据被克隆了一份，大致2倍的膨胀性，需要考虑</li></ol><p><strong>数据丢失案例</strong>：</p><p>正常录入数据</p><p><img src="'+O+'" alt="image-20250412163907395"></p><p>使用kill -9杀死进程</p><p><img src="'+y+'" alt="image-20250412163947557"></p><p>重启服务后，查看数据是否丢失</p><p><img src="'+S+'" alt="image-20250412164019685"></p><h3 id="如何检测并修复dump-rdb文件" tabindex="-1">如何检测并修复dump.rdb文件 <a class="header-anchor" href="#如何检测并修复dump-rdb文件" aria-label="Permalink to &quot;如何检测并修复dump.rdb文件&quot;">​</a></h3><p><img src="'+A+'" alt="image-20250412164706643"></p><h3 id="哪些情况会触发rdb快照" tabindex="-1">哪些情况会触发RDB快照 <a class="header-anchor" href="#哪些情况会触发rdb快照" aria-label="Permalink to &quot;哪些情况会触发RDB快照&quot;">​</a></h3><ol><li>配置文件中默认的快照配置</li><li>手动 save/bgsave 命令</li><li>执行 flushall/flushdb 命令也会产生 dump.rdb 文件，但这里面是空的，无意义</li><li>执行 shutdown 且没有设置开启 AOF 持久化</li><li>主从复制时，主节点自动触发</li></ol><h3 id="如何禁用快照" tabindex="-1">如何禁用快照 <a class="header-anchor" href="#如何禁用快照" aria-label="Permalink to &quot;如何禁用快照&quot;">​</a></h3><ol><li><p>动态所有停止 RDB 保存规则的方法：<code>redis-cli config set save</code> &quot;&quot;</p></li><li><p>快照禁用</p><p><img src="'+F+'" alt="image-20250412165053214"></p></li></ol><h3 id="rdb-优化配置项" tabindex="-1">RDB 优化配置项 <a class="header-anchor" href="#rdb-优化配置项" aria-label="Permalink to &quot;RDB 优化配置项&quot;">​</a></h3><p>配置文件<code>SNAPSHOTTING</code>模块</p><p>save &lt;seconds&gt;&lt;changes&gt;</p><p><code>dbfilename</code></p><p><code>dir</code></p><p><code>stop-writes-on-bgsave-error</code></p><p><img src="'+N+'" alt="image-20250412170306543"></p><p>默认yes</p><p>如果配置成no，表示你不在乎数据不一致或者有其他的手段发现和控制这种不一致，那么在快照写入失败时，</p><p>也能确保redis继续接受新的写请求</p><p><code>rdbcompression</code></p><p><img src="'+$+'" alt="image-20250412170338012"></p><p>默认yes</p><p>对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，redis会采用LZF算法进行压缩。 如果你不想消耗CPU来进行压缩的话，可以设置为关闭此功能</p><p><code>rdbchecksum</code></p><p><img src="'+w+'" alt="image-20250412170442335"></p><p>默认yes</p><p>在存储快照后，还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能</p><p><code>rdb-del-sync-files</code></p><p><img src="'+C+'" alt="image-20250412170506875"></p><p>rdb-del-sync-files：在没有持久性的情况下删除复制中使用的RDB文件启用。默认情况下no，此选项是禁用的。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p><img src="'+L+'" alt="image-20250412170541034"></p>',92)]))}const z=s(T,[["render",U]]);export{j as __pageData,z as default};
