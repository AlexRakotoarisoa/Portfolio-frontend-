import axios from 'axios'
import React, {useState, useEffect} from 'react'
import 'react-calendar/dist/Calendar.css';
import './OffreCandidat.css'
import jsPDF from 'jspdf';
import FormCandidat from '../FormCandidat/FormCandidat';
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';

const OffreCandidat = () => {

  const [emploi, setEmploi] = useState({});
  const [offres, setOffres] = useState([])
  const [selected, setSelected] = useState("")
  const [detailEmploi, setDetailEmploi] = useState(false)
  const [postule, setPostule] = useState(false)
  const [hover, setHover] = useState(false)



    const togglePostule = async () => {
        setPostule(!postule)
    }
    const hoverMouse = () => {
      setHover(!hover)
    }
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    const getOffres = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/offre/offrepublier/`)
            setOffres(response.data)
            if (response.data.length > 0) {
              const firstOffreId = response.data[0].id;
              setSelected(0);
              getEmploi(firstOffreId);
            }
      
        } catch (error) {
            console.error("Erreur de la recuperation de offre de la base de donnée:", error)
        }
    }

    const getEmploi = async (id) =>{
      if (id){
      axios.get(`http://localhost:8000/offre/offrepublier/${id}/`)
        .then(response => {
          setEmploi(response.data);
          setDetailEmploi(true)
          setHover(false)
          scrollToTop()
        })
        .catch(error => {
          console.error('Erreur lors du chargement de l\'emploi', error);
        });
    }}
  
    useEffect(() => {
      getOffres()
    }, [])

    const generatePDF = () => {
      const doc = new jsPDF({
        format: 'a4',
        unit: 'mm',
      });

      const margin = 20;
      const marginx = 25 // Définir un padding de 20mm
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = pageWidth - 2 * margin; // Largeur du texte avec les marges
      let currentY = 55; // Position Y initiale
      const   lineHeight = 10;
      const imageBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEMAicDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEFJUcsywozuyoqjLM3QCvL/Gf7UXww8C7lv/FllcTqM/Z9OJu3/KMNj8cVcKc6jtCN2ZyqRgrydj1Sjt0r5F8Tf8FGvClgCNC8L6rq7/8AT1Ilqv5/P/KvOZv28vif4xvTaeFPCVgH/hjt7ae8n/IYH6V6MctxMldxsvNnHLHUFonc/QGk3V8LafrX7W/xBG6GG40K1fr9otbWx2/hIvm10Np+zn+0TqiFtS+LRsN/VLbULksv0IVRUvBRp/HVj+YLFOXw02fZORRkV8t6b+yT8Q+uo/HzxW/+xay3Cfqbg12ml/swS2ZDXnxX+I98/wD2MEka/kB/WueVKlHapf5M3jUqPeFvme37qPbrXPeDfA9t4JtZoLfU9Z1MSMCX1jU5r1x7KZWOB9K6L6Vyu3Q6FfqLRRRQMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAb0pfc1578Wfjv4P+DOmm48Ramq3bLuh063xJdT/AO7GDn8TgV8L/Fz9uLxv498+y0Bj4Q0k5X/RX3Xbj187ov4Cu/DYGvitYqy7nDXxlKho3dn3H8Tf2hPAnwjUpr+uQpfYyun23764b/gA6fjivlD4kf8ABRDWtS8y28E6JHpEXa/1PEsv4Rj5R+Oa+YvBfgHxR8VvEB0/QNOudZ1GU7pHX+HP8ckh+VR/tNX2R8J/+Ceum6f5N/4+1P8AtOfqdM05mjgHs8n3n/SvceFwWBV675pdv+AeWq+KxbtSXKj5TvPEnxN+O2rNZve694vuSd5tIt8kSf8AbJPljWvavhv/AME+fGGvmK58WalbeGLXvbQ4urr8w3lj8K+9vDPhHRfBelR6boOlWuk2Ef3be0iWNfrgdT71rVw1c2qW5aEVFHVTy2N+atLmZ4L4J/Yj+FvhHy5LjSZvEV0o/wBdrExlH/fC7U/SvbNH0DTfDtklnpWn2umWi/dgs4ViQf8AAVAFX8UnFeRUrVa3xybPThRp0/gjYdRRRWJqFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACUUVh+NPGui/D/w7ea5r9/Fp2m2q7pJpTgewA7k9gKaTbSSFJqKuzTvb6DTbWW6upo7e2iQvLNIwVEUdSSelfFv7Qn7dojM+g/DZw7fdl15l+Uf9cVP3j7mvFP2jP2p9c+NuoS6fZtNpPhKJ/3Vgp+a5/25/Qe1eN+HvD2p+LNatNJ0ezl1HUbt9kNvCuSTX1mDyuNNKriPu/zPnMVmEqj9nQ+//Ij1TVr/AMQalNqGpXlxqF9cPulubiRnkkb3Y19P/s//ALDuseOBBrfjf7RoGithotP+7eXC+5/5ZD26175+zf8Asd6P8K4bTXfEqQ614uA3ruAaCyb/AKZA9W/2zzX0lxj0rLGZtvSw2i7/AORrhcv2nX+4wPBPgLw/8OtEi0nw5pVvpVjH/wAs4EwXP95m6s3uSTXQGiivmG3J3bPeilFWQtFFFIYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRVXUtSttH0+5vb2eO1s7eNpZZpG2qiKMliaAMnxx440b4d+Gb3X9evEstNtE3u7dWPZVHdieABX5b/tAftAa18d/FTXl0WstDtmYadpitxGv95v70prX/AGoP2grz43+MpEs5pYvClg5XT7X7vm+tw6+p7V47p9hcapf29nZwSXd5cSiGKCJdzSOzYVQtfa5dgFh4+2q/F+R8pjcY679nT2L/AIT8J6v448RWWiaJZSX+qXb+XFDH/wChN/dUd2r9P/2df2b9F+BOhBgsd/4luUAvdTK8n/Yj/uoPSs/9l39nCy+CHhdLu+jjuPFt/Gpvbn7wiHXyYz/dH617oa8fMcweIfsqb91fiepgcGqK55r3haKKK8I9cKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAE7V8M/t6fH2Sa5/wCFb6FdbYkAl1mSPqT1S3/HgmvqL4+fFaH4M/DHVPETKst4oFvZQt0luHyI1/P+VfkpqmqXmuapeahfXLXd9dSvNPPL96R2bLMa+hyjB+1n7aWy29TxMyxPs4+yjuypX3P+wh+z7FbWMfxI1y233M+V0eGVf9XH0M31avmP9nn4Qz/Gn4madoY3LpsX+k6jMv8ABApwR/vMflFfrLpunW+k2FvZWcK29pbxrFFDGMKiKMBR+Vd+cYz2cfYU3q9zky3Dc0vay2LdFFFfHn0wUUUUAFFFFABRRSUALRRRQAUUUUAFFFJkUALRSZHrRkUALRSZpaACiiigAoopKAFopNw9aMj1oELRSUtAwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAb0NBFKe1ZXirxFa+E/DWqa1etss9PtZLqU/wCyilj/ACoSbaSE3ZXPgD9vr4rjxZ8RLTwhYy7tP0Fd1x6Ndv1/74T+tfLNaPiLXrvxP4g1LV71/NvtQuZLqdv7zu29qvfD/wAJT+PvG+h+HbcsJdSvIrYv/dVmwzfgtfpOHpRwuHUeyPh6s3iKrl3P0D/YT+FH/CD/AAvPiO9h2ar4iK3GSeVtx/ql/I5/KvpjrVXTdOt9J0+2srWMQ21tEsUUa9FRRgD8hVoV+e16zr1ZVJdT7KjTVGmoLoLRRRWBuFFFFABRRRQBwXxw+J1t8IvhrrHiWba81vFstYW/5aztxGn4n+VeCfsC/GKfxboeueEtXuvtGq2U8mpQSN96WKZy0p/4DK7D/gVaXxItR+0V+0hp3gYos/g7wao1DWVb7s90wxHCfYDr+NfLlpJd/so/tPfvjIun6dflSeSZrCXv7kI35ivocPhYVMPKl9trm/yPDrYica8an2E7f5n6k0VBa3EV9bxXELrLDKgkR16Mp5Bqevnj3AooooAwfE/g2x8XLCt5capbiHJU6Zq11Yk5/veRIm7/AIFmvzc/aE8YeOPhb8ZPE3hnS/iD4uaxs5Inh87XbhmVZIVlC/e/2sV+oHavyz/bS/5OZ8Y/9uf/AKRQ17mUWnWlCaurM8jMfdpqS0dz7aH7LR/6K38Uf/CkH/xqj/hlk/8ARW/ij/4Ug/8AjVe4rjaKOK8n20+56HsYW2Pj3x98K/Hnwj+I3w81TTviR4u8QeFr7xFp9jfWeo6pNIyb5gPm5w0bdCCO+K+wl9a5+6j0Px0bzTpgL3+x9StzNHll8q6i8m6i54zjdC/pXQU6tV1VHm3QU6apt8uzHUUUhOAawNzivix8WtA+DnhOfXdfudkS/JBbR4M1zJ2RF7mvCvBV98Uv2o4pNam1q4+G/gGRitnBpQxf3idN5lP3R9BXzn8V/F11+1H+0vYaPZ3Ej6Gb9NKsTC3CW4f97cD6/er9KdI0m00HS7TTbC3jtLK0iWGCCMYWNFAAAHsBXr1aawVOOl5y/BHlU5vF1Ja+4vxPI7n9j/4ZaoqNrGlajr1wgwLjUdavJJPz80VneJv2ZbzTLVLr4c+OPEXhLVLdT5VvPqU13ZSn0kilZsj3r3miuGOJrJ6yv67HY8PStorHxV+zT42+IWt/tRanpPxE1F7vV9L0S4tPK8uGNEzNA+QI1HUCvtWvOvEXw98z4zeFfG1lahp4bW50vUJFYA+QyF42I77ZE2/9tK9Gq8VUhWlGcFbTYnD05U4uMnfUWiiiuM6wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBMV89ft2eJn8O/AG+t4pBHLqt5b2Ab6kyH9I6+hc18Tf8FIteK23gjRl6O9zdyfgEVf1Jrvy+n7TEwRxYyfJQkz4er6b/AOCf/hRNa+NVzqssalNH02WSP/ZkkZU/kDXzJX3p/wAE3/D6QeE/GOtbf3lxfQ2X4RR7/wD2tX2WZ1PZ4WT76HzOBhz14n2PRRRX58fZhRRRQAUUUUAJ+tcR8aPiXa/CP4a614luQHktYSLaEn/XTtxGn4tj9a7b+VfJHxvt9W/aO+POm/Drw/qK6VpXhVBqmp6i9p56R3Wf3abGIV+D69zXVhqcak1z/CtWc2IqOnD3d3sepfsr/DW68B/DldQ1nMnifxFMdW1SZ/vGWTnafoD+teO/8FDfheNQ8O6T45s4M3GnuLK+de8DsNhP+65/WvWP+FS/GQDH/C+Hx/2KNl/jWb4k+AfxU8XeH77RdY+Ni3um30LQzwt4RtBvU+4euyjVVPEKu6i389vuOOpTcqPslB/hv95S/YX+KC+OvhDFol1MH1Xw6Vs3HdrcjML/AIrx+FfR+OK/Mb9nfxTffs9/tHHRdXk+zWkt2+jaiHyE+9+6l/PFfpzU5lQVKvzR+GWqLwNX2lJJ7x0Foooryz0hK/LP9tL/AJOZ8Y/9uX/pFDX6mV+Wf7aX/JzPjH/ty/8ASKGvdyf/AHiX+F/mjx80/gr1PtwfFr4yYH/Fh3/8K6y/wqrqXxh+NVvZSSR/Ako46Z8UWsx/75Rcn8695XoKWvLVWF/4a/H/ADO/2c7fG/w/yPnf9inxNrPjLwX401fxAGTWbnxTcNcwtH5flOLa2XZt7YxX0RXN+E/BsPhPUfFFzDLvXW9U/tMx7ceWxt4ImHvkwlv+BV0lZ1pqpUcoqyLpRcIKLYneuZ+KGtSeGvhr4r1aIbpLDSbu6VfUpCzAfpXT+tUtY05NY0i9sJf9XdQPC30ZSD/Ooi0pJsuSbi0j8vf2L41k/aV8G7vW7P5Wcxr9Tq/KL4I3s3wd/aU0BNaUwT6bqr6bdnsu/dblv935q/V4V7mcK9aMujR5GVv93JdUxaKKK8E9oKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBK/P3/go5ebviP4Xtf+eelNN/31My/wBK/QKvz3/4KNWez4p+G7r/AJ6aP5X/AHzPI39a9fKv97ieZmP+7s+Ta/R//gnvZ/ZfgZdyf8/Gszy/+Q4V/wDZa/OCv0j/AOCfdx5/wHlX/njq9xH/AOOxn+tfQZz/ALsvU8bLP4/yPpiiiiviD6wKKKKACiiigDhfjP8AFCw+EHw81XxHeNG0lvGVtbd22+fORhIx9TXl37EGgRL8J5vF9xKbzX/FN/cXuo3T43MyzOgU49AP1rufGX7NPw9+IWqNf+JNJvdZutzMrXOs3pWLd1Ea+dtQeygCpvB/7OvgX4fyK3hzT9R0cLL5xittbvhE7+rx+dtb8Qa7lUoxoOmr8z/q25xOnVlWU3ay/rsemUUVFMglRlO4Bhj5Tg1wnafn1/wUO8E2WifEPQvEFqAtxrVtIl1Gv8TQ7cP+RH5V9P8A7Kfxqt/jB8MbD7RdK/iLS4ktNSiZhvZ1G0TY9Hxu/OrniD9k/wCGHivUBfa1oV9q95t2/aL7XL+Z8emWnNN0P9kv4W+GL/7dpGgXml3mMefZ63fwvj6rOK9mpiaFXDRoyvzR62X+Z5UMPWp15VI2s+n9I9auLiO1heaZ1iijBZ5HOAoHc1yXgD4x+DfilPqEPhbXrfVpbBtlxHEGVl9wGAyv+0Mj3rpL7RbPUtFuNJvIRdafcQNbTQzMX8yNlKsrE8nIJH415x8Hf2avBvwQ1TU9R8PQ3cl7fjY019MJGii3bvKjwo2pnHHPSvMiqXJLmvzdO3zO+XtOdctrdT1Un3r8sP2zp0n/AGlPGRjdWGbVP+BC0hDV+mPinwTp3jGOJNQm1SFYs4Gm6td2Oc9d3kSpu/4FmvMrj9jP4P3VxLPN4SaaaVtzyPql4ST6/wCuruy/E08LN1J3eltDkxlCpiIqEbHsdnewX9rFc20yTwSqGSRGBDA96maRVUlmAHrXif8AwxV8Gv8AoTj/AODS8/8Aj1H/AAxV8Gv+hOP/AINLz/49XJy0P5n9y/8AkjpvW/lX3/8AALPxq/aG0rwGlv4d0K6ttV8datIlppmnRt5irLI2xHl2/dXPr6V6l4Z0VfDug2GnrI07W8QR53+9K/V3PuzZY+5rzrwf+yv8L/AfiKz17Q/DAs9Vs2LQXDX1zLsJGDhXkI6e1esfhU1JUuVRpX87hTjUu5VDif8AhdXgj/hP/wDhCP8AhIrT/hJ8Z+w/N1/ub8bN/wDsbt3tXbd68g/4ZV8B/wDC3P8AhYf2O4/tnz/tn2fzf9G+1bs/aNmM+ZnvnHtXsHHWpqKmrezb219Sqbqa858dftn/ALLd74uupPHfhG0a61NIwNS02Bf3lyq/dlj9ZB0p/wCzb+2jpUmj2vhX4iXR0nWbMfZ49UuOIrgKOkh/5ZuOhB4r7CPSvNviF+zr8PfilO1z4g8N20983W8gLQTn6uhBP45r0IYuFSkqGJV0tmt0ccsNKnU9rQdm90d1pOvadr1jFeabf2uoWsqh0ntZlkRge4KnBrI8YfErwv4BsWu/EOu2OlQr0+0TqrMfRVzkn6CvCJv+Ce3wzmvvPW98Qwx53fZkvIjF+sRP616R8P8A9mH4bfDO+F9o3hqA6iPu3l47XEq/7pcnH4YrmlHDrVSb+X63N4yrvRxS+Za8ITa58Sdaj8R6nbXGieGbc7tK0m4XZcXLf8/NwP4R/cj7fePOAPS6TH5UtckpczOiMeVC0UUUiwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBD2r4b/AOCk2kut74E1TrHsu7Y/XMTCvuSvmX/goF4e/tb4IQ6gBl9L1OGf/gLBoz/6EK9HLp+zxUGcONjz4eSPzfr9AP8AgnFrSz/DvxVpOPmtdVFz+EsSqP8A0Sa/P+vrH/gnb4oTTfiZr+hyNj+07ASp/tSQtg/oTX1+a0/aYSXkfN4CXLXj5n6FUUUV+fn2QUUUUAFFFFABRRRQAUUmaKAFoopKAFopKWgAoopKAFopKKAFopKM0ALRSUZFAC0UlFAC0UlFAC0UmaWgAoopM0ALRSZooAWikooAWiiigAopKMigBaKTNFAC0UlLQAUUUmaAFopKWgAopKWgAoopMj1oAWikpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigBveuX+KHgmH4jfD3xB4cmIA1GzkhVj0V8ZRvwYKfwrqPSlpxk4tSXQmUVJNM/Eu6tZbC6ntbhGinhcxyRt95WHDLXafAzxsPhz8XfCmvu/kwWl6qXL/9MX/dy/8AkNq9E/bU+FzfD34zXl/An/Er8Qg6hDj+GYn98P6/jXgNfpNOUcXQv0kj4aSlh61v5Wftz95Rij0rxb9kL4mD4l/BTR3nlEmqaUv9m3n+9GAFb8U2n869pr85q03SqOEt0fb05qpBSXUdRRRWZoFFFFAHm/xo1DxEvh2WDwlO0WuWcf8Aa4RefPSB1Y2x/wCu3KfnWd8T9btPHH7POs+KtI1G/s1GhT6xYXWn3s9pIji2d0LGJlYgHqp446Vo/wDCoLfxDr2qaj41g8O+L0lIFhHdaAm+yjH/ACz3vJJuGcnovNZXw9+Bd34V8D+KPB+r6/bar4d1j7UkFpYaabL7DFcb/MijPmyfL85x6V1p01Fa6r+mcbVRyemj/pHLaHo0mteAfgOLvWPEO/VvK+3yRa5dxS3Jk0q5uW8yRJVZv3kSnrSXOhfav2tJPDp1jxGujSeEv7ZNlHr98kK3RvvL3gLMMDbxs+77V2/hP4TaxoTeELS/8R2eo6J4Ux/ZlvDpbQXJ22slqnnTGd1fEUr/AHY0ycH2qpP8I/FLfGKbx/D4q0mO5bSv7Gis5NEldEtvtHncsLsZfPG7AHtT543fvdH+ZPJLlXu9UR+A9QuvFWsfEb4f65qF/eDw/eW6RajBcS2lw8E8Kzxr50RRt68qWUjNcN+zj4QvviZ8C/B2t6p4q8SNe3V7PdajN/bl55l3HHJcwpEGEo8peY2OzGSn0I9h0j4fXPhXStcfRtTjPiLV7r7Zc6rqlqbhXkwq/NFG8fyhFCqoYY9+/P8Awl+EviX4S/DBfCNn4n0u+azDf2deTaNIBFvleSTzYxdfvM7yBtZMe9DnHlfK+q/LUFCV1zLo/wDgHG/siaXqviD4b+FPGuo+JdY1O7urO/try21DUZ7mKZ/tuI5QskjBGRYSvA6MaxvCfiDXr7WLTwl4m8Q6r4c+Ix11L6VJrlxYavZRXYd47XO5VU2/GxNjE9cjOPWPgT8LNS+Dfga18K3Ou22uWFlv+yyx2DW0o3yvI+8maTdy/Xis/R/gSbXSvAOmanrrapZ+D2t57RhaCKaSaKJo1JYMcJhvuAdgM8CtHUpupN306fiSqc+WFl6nrH4V8l/GHxBbfD346a8L6+8XXehp4Ol14aTp2uamI2vftbLnMMh+zx7Rt7RKD0FfS2k/2z/wlevfapll0QLbixjMOx45NjecN38aHMRDdmLr/DXnGvfBPxJrXxSv/GR8SaDIbnRm0H+zb7w9LPAbRpvNIkH2xd7dicAcnisKMowk+Z6WNqylOK5UdZb/AAzlX4dv4WuvEetTP5tw8WrRajPHeRq8zyRKZvMLvsVlj+ZjuCc+led/Dm2m+KGnW3h7WNT1ix1TwTcyWGrtpuv3UL3suCql2SXeyOoEmWbcp+Ve5r1DUPDviuTwfDp2n+JbGy1s7vP1WTSmlRtxJJjh89dhyeMs2Md65lvhHrlv4+0TxRpfiLTtLmtdOXT9Qto9Idkv1D7if+Pn5Mfw53lcnk1UJR5Zc0ten9eZMoO6tH+v+AeaeOJLbSf2mrrRr7UvGz6BdeFf7T+w6JqWqzlbw3pTzFjtmLRrt4xxH7CsPxxN4y0f4X/CDVvGd/4h03xVdeJrTStZi03UrmJp7R5Lg7TBaPtaRo1j5Vd/btXsX/CpPEn/AAur/hYP/CU6b/yDv7H/ALN/seT/AI8/P87Hmfav9bnjftx/s1Y+MHwo1z4nX3hprTxFYaRZ6FqttrUMNxpcly0lzCWK7mW4j+T5vu4/GtY1YJxTfqZeym1J2Mv4T+H7Pxl4d1jV7bVPE8Gg6w7WkWn32s3xubZ7S7uImlSaSXzYvNCoWQEY245rwDwH401PUvgX4Xm0fXPFl18YNUuJBpzX95qcljdlLxi4zMfsjgW4P5V9W6N4V8U6TpOpxjXdF/tO5cPA9tobw2cJLs8rGH7SWdnZ3Yt5gyTn1z594Z/Zp1DQfhRp/guXxZbyyaLdLe6Lq9vpTRT2cwmeUs4M7iQHeVwNnGevZ06lNN8z6r8n5feEqdRpJLozoP2hPDt1deCtb8QW+uappY0Pw/qk8dvpt/PaeZcGFXhlcxOu7y/KfAPHzmqPwY8Czat8N9L1LUPEev31v4h8PaXLNHJrF2ZYrgRM8ssU3m+ZH5nmLkKR9z3xXV+NPBfiXxl8NL/w1N4g0u31HUrWayvdRTSZDE0ciMjeXD9pyjYbqZG6dOeDwX4M8SeDfhnYeGofEGl3Go6baw2VlqD6TIIlijRUXzIRc5dsL1Ei9enHPPzWp8t9bm3JepzW6Hi/wX/4TTWv2RX1/wAO6tqWqePtSt7gRXGqahLdgvHdyoNizSFUOwdscgeldH8OLjT/AIp648Nh4h8Q2umabpUmm6v4Y1DVLqHULO7MkEkUplDCYnakq7/M5zx1ONTwT+z/AKt4T+ENr4Bl8Wwz2ljeW15Z39pppt542jvlu23bppAxLLtBwMZ710y/C7UbfxdrHi231mzXxPdWEemW08mnsbeGBZTJ+8iEwMrnJ+bevbtXROpTbnZ9XYyjTqWjddNT5+/Zt1Wb4jaH4Js59e8YJ4raK41q61e61bUmtJorbU40+zeVI4hmWSJ9pK52/jXofxH8Yaj4N+K+pS+LtT1jQfB15a29toOuabIRa2NywIl+0oMqWLYKtKrIAO2a3fhN8DNf+F+g+HtD/wCEm0fUdM0dpAko0F4r1o5JvOeMTG6YKGcLnCc7R7Vs+Ivg7da5D47tRr4i0/xdKpuLeSzEnkJ9jitm8s7h85EQbcc4444FEqlJ1m/sv/P0FGnUVNK2p0/g7Q72H4b6LpGt6g9/qKaVDa3uoWt3JunkESrJKs3D5YgsH4bnPWvlnwTcnxNr3ivwdP4h8aQ63eeMNY0bSdWXW9UMGmwQ2zSRNu83ypirRn92zbuTnGK+t7TRTovhqDSdHeO1+yWq21pJdI0yx7U2oWUMpcDAyNy59RXk3g34E+KfBza1t8V6HenVtbuNdmkk8Oy+bBPOAsnkMb0iP5Nyg4ONx9TnGlOMea79DSrCT5bIxf2vNJ1Tw/8ADfxX4z03xLrOm3VrZ6fbWdvYajPbRxSfbcSylY3UMzpMF5H8Nev+CfB7+DRq0X9q3+pWd3eC5tY9SvJruS2TyY0MQkmdmI3o79eN5rB+O3wt1P4x+B7rwra67baHYXuz7VJJYNcynZIkibCJowvKdea7fQ4dTt9Nhj1e8tb6/XPmT2Vs1vE3phGkkI/76NRKd6SjfW/+VjSMLVXK2lv8zzfxXr9z4i+N2k/D6PULzT7BdCm1y/NlK0EtwPOSCKMSrhkGfMY7Cp4HNaN5Z6t8NZvHXimbUrzWdCt9GinsdKmmMjwvbpcPKFyMkyBo/mZmYleegra8VeA21vxBpniLTr4aXr2mwzW8FxJD50UkcgG6OWPcpZdyo3yspyvWtXSdJvlspk1q+i1SedBHKsNt5FvjBBCxl3Iznnc7UuZWSXzDld3c8ZVdZ/4Z/wD+Flf8JBqn/CWHQf8AhIN32mb7H/qvtPkfZN3l7Mfu87N+O9W/iNHqHxL8O/DPUdF1jWPCeoeIZvkkt72aJYN+mXVygmhRwkmJI48g+nWt9vgteN4P/wCEI/4SNv8AhCfK+y/ZPsh+2/Z92fI+0+Zjy9n7v/V7tv8AF3rU8aeAfEGtat4auNB1zS9Fs9Bm+029teaTJd5k+zzQcstzFhdkx49utbc8b3T6sy5J2s12PNfAuuP8QvitoY1S71rTNcsrDUBrmiwaxdxWyXtrLYrGwgWQIYmWaRhxtfPfmqPjzwje6P8AHL4aaLceLPEclp4kvNfuL6ODXL23Xy1i86CNFSUKixBgBjHT8K9rHwz0iH4oDx5ErRay2lvpUxX7ssRkjkBPuDHj6GuW8e/CfxL4s+JnhfxdZeKNL07/AIRwXX2C0n0WW45uIhHJ5ri6TfwMjaq496casOfeys/vswdKXLqru/4XR598ftLvfAfhf4UmXxH4kuL1de0rQ9TvbDUr6KTUbbZIJSYYZTukkIznl8nrxXRfCPWrjVvi5rMfhu+1m98A2Wli2uV12a7eeDVhNkoBefvgPJIz2yfpXS/GH4T658Trzw01l4isNHtdD1S21mGO40uS6eS5hLFdzLcR/JhsbcfjVix+GOtaP8QD4n03xDZWo1C3gi1zTzpbNDeSR8edDicGFyvy/N5uBjrSU4OnZvXUOSaqXS0OX+Fa6h8aPh+fG15rWs6Tqmoz3o02O1u5II9PjSaSGMNAG8uVhs3HzVfk1wfxO+IGqeOP2MoPiLFf6poXiOO3h2zabfT2WJTdpBISkUgDAkMQGzjI6V7LD8K9T0S11HS/D3iRdI0DUZriea3exE1xbtMSz/Zpd6rH87M37yOTk1k/Ez4Cv4w+Edv8ONC1e38PeH0ghgcz2TXcu2KSN49pEseOY+TznParjUp+0TvpdfJdUS6c+Vq3T8T0zQ9Fg8P6XDY20t3NDEOHvruW6lOTnmSVmc/ia+UpdStdB+NPxB8N32qeNL2xg1HQNP0mK31/Vilo14qrK0kyyMq4LBgJT24619FaB4X8WQ+LItX17xRZahaw2Mlqmm6bpclnEZHkjbzm33Mu5gE2jp941w2n/A3xZp/jTxZ4lPizw7dXniN7GW4huvDU0kUT2q7YWRft3BHX6gGsqUoQcuZ7r9TSrGclHlRH8UofFXgPwv4AQ3eseIfD2k4i8T3WlyPFqN1GkG1LjKvvI8wbpArFjn611fwTvv7b0XWdbt/E7eKtF1fUTeaXcu+Xt7cwQqYGGBtKyJKcdfm55rS1jwDf32veHNXs9ca0utH0+6sdr24eO584253OoYcA24OAR97rxU/w1+Htt8N9GvrKCf7RLfahPqVxJsEaGaZtzbEBOxegC57UpSi6dupUYSVS/Q8q+JHi7UfBvxY1Gbxbqmr6D4OvLW3ttB1rTZCLWxuWyJftKDKli2CrSqyADtmu1vNO8RQ/B/R/DEWvFfF95pUdl/biSmXE6wjzLnccFuQW9ckUeJPg7da8njq2XxB5Vh4tkBuLaWzWQQJ9jitm8s7h858kNuOcZAxxT3+DdvqWsWkWuf2L4h8JafZpaafoupaMs8lttVV3+c8jBmO0Z/dg8Dmq56bjHXVGfJPmlpuW/AuuxfGH4X2k+oi6sLqVTbajDZXctrNb3UTFJkEkZR1IkQ9COK+XPAPjTU9U+BvhqXRtc8W3fxe1O5kGnNf3mpSWV3su2LjMx+yOBbAn8BX0D4L+CviL4c6t4nm8N+JdD03SdYnW5h0ZfDjLbWcgVULIEukzuVRnpzg+1ZHhn9mvUNB+FNh4Ll8WW8smjXS3uiavbaSYrizmE7SlnBnZZAdxXA2cZ9sbRnRg3Z6Np9fPyIlGrJK61syt8W9Jk/4aD+FenR6vr1lp/iD+1BqVrY61eW8UvkWqvHhY5QI+f7uM/rX0D0rxvxF8IPG3iTxx4R8U3XjPQUv/AA39q+yxx+HZxG/nxeW+8fbueOld74H8P654fj1eTxBr8evXd/e/aUaC1e2htk8qOMQxxtLKQuYy33uWdq5qjjKMbPVL9WdFNSjKV1ozqaKKK5jpCiiigAooooAKKKKACiiigAooooAKKKKACiiigDw/9rv4Pv8AFv4T3aWEPm65pLfbrFe7lR88f/AlyPqBX5aV+3RxzX5s/ttfAtvhz48PifS7bb4e12Qu23hba56uuP8Aa+8Pxr6fJsXyt4eXXY8DMsPf97H5mJ+xz8ZP+FV/FSC0vZvK0HXdtndb+FjkH+ql/p+NfqB6Yr8Rq/Sf9i34/f8AC0vBh8OaxcB/E2iRKpd2+a7t+iy/UfdPvirznCf8xEF6/wCZOW4n/lzL5H0pRRRXyp9CFFFFABRRRQAUUUUAFFFFABSUtFABRRRQAUUUUAFFFFABRRRQAUlLRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAlc94+8C6V8SPCeo+HdatxPYX0Rjcd1PZlPYg4IroaKcW4tNbomUVJWZ+Pfxg+Feq/Bvx1e+HdUG8RnzLa7PS5hPSQe9ZXgHx1rHw18W2HiLQ7lrXUbNsgfwyL/Ejr/Epr9T/jt8DdF+OfhF9M1EC21GHL2GpKgMltJ6+6nuvevyz+Ifw/1v4Y+Krzw/4gtfs1/bHgj7siH7ro38QNfd4HGQxtP2dT4uvmfJYvCyws1OGx+rPwV+L+kfGrwPaeINLIjkP7q7sy4L2sw+9G3uK7zv0r8hfgx8aNb+CPi6HWdIk863bEd5YM22K7j9D7/3Wr9TPhb8UdB+L3hK21/QLnzraT5ZYW4kgkHWN17MK+ZzDASwk+aOsWe7g8WsRGz+I7CiiivJPSCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAT8K80+OHwH8O/HLw79i1WL7PqMAJstTiUedbsfQ91PdT1r0vtSfhVU6kqclKLs0ROEakeWS0Px9+LXwh8RfBvxPJo2v220HLW13GMwXKf34yeh9qd8IfjL4j+C3iZNX0C5zG21bqykOYLlPRh2PuK/Vv4gfDjw98UPD8mjeJNNi1Kxf5lDjDxt2ZG6qw9RX53ftB/sf+IfhDJcaro/neIPCuN5uFX99aD/psB1HuK+xwmYUsXH2Nfd/ifM4jB1MNL2lHVH3b8Evj14c+OXh8XukTiDUYVH2zTJWHnW7H27qezDg16XX4seGfE2reDdattW0W/n07Ubc5juIWwQK++PgD+3LovjGG30fx08Oga791b/7tncn1z/yzPsa8rG5VOjepS1j+R6OFzCNT3aujPq+io45FmQOhVlYZDLUleCewFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRSHpQAhak/iBoooAXNLTaVaAHUUUUAFJS0UAfNXxu/Yj8K/Efz9T8ObPCuvPliYExazt/wBNIx/MflXwn8Tvgl4y+EN4YfEuiTW1vu2xahF+9tpfYSjoa/X+q2pada6tZy2d7bRXdrKu2SGeMOjr6EHrXsYXNK2H92XvRPLxGX062sdGflp8Fv2rPGvwZ8uyt7ldZ0Ef8wvUGYqn/XNvvR/Q8V9z/B/9rrwJ8WvKtBd/2BrjcHTdSYKWPpHJ91/w/KuL+Kn7BXg/xg0t74XuJPCmoNz5Ma+ZaN/2zPK/gfwr5P8AiR+yH8S/hwZZZNFbXtOX/l80XdcD8Yz+8WvSksDmGqfJNnCpYvB6Nc0T9UeD70V+Unwz/al+IvwoaK1stWOo6dD8n9m6tumj/wB1T96Ovq/4f/8ABQjwbryx2/ijTr3w1dY+adV+0W+fqvzD/vmvMr5XXo6xXMvI76OYUqnxaPzPqzml6Vz3hH4g+GvH1n9q8O65Y6xDjJaznVyv1AOR+NdDXkuLi7NWPRjJSV0xaKKKRQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFI3SlooAZRSkUlABSrSU6gBaKKKACiiigAooooAKSlooA4nxp8GfA/wARNzeIfC+m6lM3W4eELP8A9/Vw4/OvAvGv/BO/wfrG6Xw5reoeH5ccQyhbqH/vk4P619ZdqOK6qWLr0fgm0c1TD0qnxRPzu1v9gD4keHLoXXh7WNL1J4uY3inktJh+PT9aXT9U/am+FMnlGy8RapAgwY5ol1UEezr5hr9EKK7v7UqSVqsVL1RyfUIRd6cnE+F7P9vbx/4XKDxj8O4V9Siz2B/KTzK7fRf+Ci3ge6jH9qaBrmnSekKRzp/31uX+VfV+0HqKyJvBfh64kMkuhabLIerPaRkn8SKwdfCy3pW9GaKjXjtUv8jx7Sf24vhHqXEuvXOnN/dutPnz/wCOK1djpP7SXwu1lQbfx3oaf9fV2tv/AOjNtbknwj8DTKUk8G+H3U9VbS4CD/47WfcfAL4aXEex/AHhoD/pnpUCH8worFvDPZNfcapYhbtM6zR/EWl+Ircz6VqVnqcIODJZzrKo/FSa0q57wj8P/DngKC4h8OaJY6LFcMHlSyhEYdh3OK6GuSVr+6dSvbUKKKKBhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFJS0UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k='


      const imgWidth = 100; // Largeur de l'image en mm
      const imgHeight = 35; // Hauteur de l'image en mm
      const imgX = margin; // Position X de l'image
      const imgY = 13; // Position Y de l'image

      doc.addImage(imageBase64, 'PNG', 55, imgY, imgWidth, imgHeight, { align: 'center' });

      doc.setFont("Times New Roman", "normal");
      const title = 'Pour étoffer notre équipe, nous recherchons';
      const titleWidth = doc.getTextWidth(title); // Obtenez la largeur du texte
      doc.setFontSize(12);
      doc.text(title, pageWidth / 2, currentY, { align: 'center' }); // Ajouter le texte centré
      currentY += 9;

      // Ajouter le titre du poste
      doc.setFont("Times New Roman", "bold");
      const titleEmploi = `UN ${emploi.titre}`;
      const titleWidthEmploi = doc.getTextWidth(titleEmploi); // Obtenez la largeur du texte
      doc.setFontSize(16);
      doc.text(titleEmploi, pageWidth / 2, currentY,  { align: 'center' });
      currentY += 8;

             // Revenir à la police normale pour le reste du documen
    
      // Ajouter la localisation
  
      doc.setFontSize(12);
      doc.text(`Poste basé à ${emploi.localisation}`, pageWidth / 2, currentY, { align: 'center' });
      currentY += 9;

      // Profil
      doc.setFontSize(12);
      doc.text('Profil :', margin, currentY);
      currentY += 10;

      doc.setFont("Times New Roman", "normal");
      doc.setFontSize(11);
      emploi.profil.forEach((item, index) => {
        const line = doc.splitTextToSize(`- ${item.descriptionP}`, textWidth);
        line.forEach(line => {
          doc.text(line, marginx, currentY);
          currentY += 8;
        });
      });
    
      //Mission
      doc.setFont("Times New Roman", "bold");
      currentY += 6;
      doc.setFontSize(12);
      doc.text('Missions :', margin, currentY);
      currentY += lineHeight;

      doc.setFont("Times New Roman", "normal");
      doc.setFontSize(11);
      emploi.mission.forEach((item, index) => {
        const lines = doc.splitTextToSize(`- ${item.descriptionM}`, textWidth);
        lines.forEach(line => {
          doc.text(line, marginx, currentY);
          currentY += 8;
        });
      });
    
      // Date d'échéance
      currentY += 10;
      doc.setFontSize(12);
      const formattedDate = new Date(emploi.date_echeance).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const longText = `Si votre profil correspond  à ces critères, veuillez soumettre directement vos informations ainsi que votre CV via le formulaire de Candidature avant le ${formattedDate}.`;
      const lines = doc.splitTextToSize(longText, textWidth);
      lines.forEach(line => {
        doc.text(line, margin, currentY);
        currentY += 6; // Ajouter la hauteur de ligne + interligne
      });
      currentY += 18;

      doc.setFont("Times New Roman", "bold");
      doc.setFontSize(11);
      doc.text(`N.B : Seuls les candidats retenus feront l'objet d'un entretient`, margin, currentY, { maxWidth: textWidth });
      currentY += 10;
      
      // Sauvegarder le fichier PDF
      doc.save('offre_candidat.pdf');
    };
    

  return (
    <div className={postule? 'hidd' :'containerCandidature'}>
       {postule && (
       <FormCandidat idOffre={emploi.id} closeBtn={togglePostule} emploi={emploi.titre}/>
       )}
      
    <div className='offreCandidat' id='offreCandidat'> 
       <div 
       className='btn_offre_mobile'
       onClick={hoverMouse}
       >
      </div>
        <div className='contentprinp'>
            <div className={hover ? 'listeOffreCandidat show' : 'listeOffreCandidat'}>
                  <div className='scrollListe'> 
                          {
                          offres.length > 0 ? (
                            offres.map((offre, index) => {
                              
                              return (
                              <div 
                                key={index}
                                onClick={() => {setSelected(index); getEmploi(offre.id)}}
                                className={selected===index?'offreContent selected':'offreContent'}
                                > 
                                  <div >{offre.titre}</div>
                              </div>
                            );
                          })):(
                            <p style={{color:'#E0E0E0'}}>Aucun offre d'emploi disponible pour le moment</p>
                          )
                          }
                  </div>
            </div>

            {detailEmploi ? (
            <div className='descriptionOffreCandidat' id='pdf-content'>
              
                 <div className='detaille'>
                 <div className='center'>
                        <p className='titre1'>Pour étoffer notre équipe, nous recherchons :</p>
                        <p className='titre2'><strong>UN {emploi.titre}</strong></p>
                        <p className='titre3'><strong>Poste basé a {emploi.localisation}</strong></p>
                        <p className='titre4'><strong>Profil :</strong></p>
                        <ul>
                        {
                                  emploi.profil.map((profile, index) => (
                                    <li key={index}>{profile.descriptionP}</li>
                                  ))
                                
                            }

                        </ul>
                        <p className='titre4'><strong>Missions :</strong></p>
                        <ul>
                        {
                                  emploi.mission.map((missi, index) => (
                                    <li key={index}>{missi.descriptionM}</li>
                                  ))
                                
                            }

                        </ul>
                        <p className='titre5'>Si votre profil correspond  à ces critères, veuillez soumettre directement vos informations ainsi que votre CV via le formulaire de Candidature avant le <strong>{new Date(emploi.date_echeance).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                        })} </strong></p><br/>
                        <p className='titre6'><strong>N.B : Seuls les candidats retenus feront l'objet d'un entretient</strong></p>
                 </div>
                 </div>
  
                 
            </div>
            
            ):
            (         
                <div className='chargementDesp'>
                  <div className="chargement">
                    <Rings color="#36D7B7" />
                  </div>
                </div>
            )}
          {detailEmploi ? (
            <div className='boutonTel'>
              <button onClick={generatePDF}>Télécharger PDF </button>
              <button className='intere' onClick={togglePostule}>Postuler</button>
            </div>
          ):(
          <div className='boutonTel'> </div>
          )}
          </div>        
    </div>
    </div>
  )
}

export default OffreCandidat
